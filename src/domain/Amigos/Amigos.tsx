import React, { Component } from "react";

import {
  IonAlert,
  IonFab,
  IonFabButton,
  IonIcon,
  IonList,
  IonToast
} from "@ionic/react";
import { personAdd } from "ionicons/icons";
import { amigo } from "../../data/amigos-context";
import ModalBuscarPersona from "./ModalBuscarPersona";
import AmigoItem from "./AmigoItem";
import { AuthContext } from "../../context/authContext";
import BKDataContext from "../../data/BKDataContext";
import AppPage from "../../components/AppPage";

class Amigos extends Component {
  state = {
    amigos: [],
    estadoIniElim: false,
    msjToast: "",
    estaBuscando: false,
    idAmigoAEliminar: null,

    // Obtenemos el identificador del usuario del contexto
    // de autenticación, lo asignamos al estado
    idUsuario: this.context.authState.user?.idUsuario ?? null,
  };

  DURACION_TOAST = 3000;

  private __obtenerAmigo(id: number | null) {
    const amigo = this.state.amigos.find((a: amigo) => a.id === id) as
      | amigo
      | undefined;

    if (!amigo) {
      throw new Error(
        `Error, no se encontró al amigo relacionado con id ${id}`
      );
    }

    return amigo;
  }

  iniciarEliminacionAmigoHandler = (idAmigo: number) => {
    // Set the specified friend as the friend to be deleted and
    // display confirmation element
    this.setState({
      msjToast: "",
      estadoIniElim: true,
      idAmigoAEliminar: idAmigo,
    });
  };

  /**
   * Manejador para eliminación de amigo relacionado
   */
  eliminarAmigoHandler = () => {
    try {
      // El usuario confirma la eliminación de un amigo, obtenemos el id de dicho 
      // amigo del estado del componente. Mostramos mensaje de éxito de eliminación,
      // ocultamos modal de confirmación y limpiamos identificador de amigo a 
      // eliminar. Para actualizar el estado volvemos a asignar la lista de amigos
      // sin el recién eliminado.
      let { idAmigoAEliminar, idUsuario } = this.state;

      // Obtenemos al amigo a eliminar
      const amigoAEliminar = this.__obtenerAmigo(idAmigoAEliminar);

      // Eliminamos la relación de la base de datos
      BKDataContext.EliminarAmigo(idUsuario, idAmigoAEliminar);

      // Creamos nuevo arreglo excluyendo al amigo eliminado
      const amigos = this.state.amigos.filter(
        (a: amigo) => a.id !== amigoAEliminar.id
      );

      this.setState({
        msjToast: `${amigoAEliminar.nombre} y tú ya no son amigos`,
        estadoIniElim: false, // Ocultamos modal de confirmación
        amigoAEliminar: null, // Limpiamos identificador de amigo a eliminar
        amigos,
      });
    } catch (err) {
      console.error(err);

      // Mostramos mensaje de error simple al usuario
      this.setState({
        msjToast: "Error durante eliminación",
        estadoIniElim: false,
        idAmigoAEliminar: null,
      });
    }
  };

  abrirChatHandler = () => {
    console.log("Enviando mensaje a amigo...");
  };

  buscarPersonaHandler = () => {
    // Start the search of users
    this.setState({ estaBuscando: true });
  };

  cerrarBusquedaHandler = () => {
    // Cerrar modal de búsqueda de usuarios y obtener amigos relacionados
    // del contexto de datos.
    this.setState({ estaBuscando: false });
    this.obtenerAmigos();
  };

  componentDidMount = () => {
    // Obtenemos los amigos relacionados del contexto de datos.
    // La obtención de datos se realiza de manera asíncrona.
    this.obtenerAmigos();
  };

  obtenerAmigos = async () => {
    try {
      const { idUsuario } = this.state;
      if (!idUsuario) {
        // Falsy value for the user id, we abort the process
        throw new Error("Id usuario no válido");
      }

      // Esperamos la respuesta del contexto de datos y
      // actualizamos el contexto local
      this.setState({ amigos: await BKDataContext.Amigos(idUsuario) });
    } catch (ex) {
      console.error(ex);
    }
  };

  render() {
    // Destructuring the state
    const { estaBuscando, msjToast, estadoIniElim, amigos } = this.state;
    return (
      <React.Fragment>
        <ModalBuscarPersona
          show={estaBuscando}
          idUsuario={this.state.idUsuario}
          onCancel={this.cerrarBusquedaHandler}
        />
        <IonToast
          isOpen={!!msjToast}
          message={msjToast}
          duration={this.DURACION_TOAST}
          onDidDismiss={() => {
            this.setState({ msjToast: "" });
          }}
        />
        <IonAlert
          isOpen={estadoIniElim}
          message="¿Desea eliminar a este amigo? Esta acción no se puede deshacer"
          buttons={[
            {
              text: "Cancelar",
              role: "cancel",
              handler: () => {
                this.setState({ estadoIniElim: false });
              },
            },
            {
              text: "Eliminar",
              handler: this.eliminarAmigoHandler,
            },
          ]}
        />
        <AppPage titulo="Amigos" esVistaSecundaria>
          {amigos && (
            <IonList lines="full">
              {amigos.map((a: amigo) => (
                <AmigoItem
                  key={a.id}
                  onIniciarEliminacion={() => {
                    this.iniciarEliminacionAmigoHandler(a.id);
                  }}
                  onAbrirChat={this.abrirChatHandler}
                  amigo={a}
                ></AmigoItem>
              ))}
            </IonList>
          )}
          <IonFab horizontal="end" vertical="bottom" slot="fixed">
            <IonFabButton color="light" onClick={this.buscarPersonaHandler}>
              <IonIcon icon={personAdd}></IonIcon>
            </IonFabButton>
          </IonFab>
        </AppPage>
      </React.Fragment>
    );
  }
}

Amigos.contextType = AuthContext;

export default Amigos;

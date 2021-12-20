import React, { Component } from "react";

import {
  IonAlert,
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
  isPlatform,
} from "@ionic/react";
import { person, personAdd } from "ionicons/icons";
import { amigo } from "../../data/amigos-context";
import ModalBuscarPersona from "./ModalBuscarPersona";
import AmigoItem from "./AmigoItem";
import { llamadaAjax } from "../../bk-utils";
import { AMIGOS_CONTROLLER } from "../../bk-constantes";
import { AuthStateContext } from "../../context";

class Amigos extends Component {
  state = {
    amigos: [],
    estadoIniElim: false,
    msjToast: "",
    estaBuscando: false,
    idAmigoAEliminar: null,
  };

  DURACION_TOAST = 3000;

  // const amigosCtx = useContext(AmigosContext);
  // const [estadoIniElim, setIniciarEliminacion] = useState(false);
  // const [msjToast, setMsjToast] = useState("");
  // const [estaBuscando, setEstaBuscando] = useState(false);

  // Change: We cannot use hooks in class components
  // opcionesDeslizablesRef = useRef<HTMLIonItemSlidingElement>(null);

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
      // El usuario confirma la eliminación de un amigo, obtenemos el
      // id de dicho amigo del estado del componente. Mostramos mensaje
      // de éxito de eliminación, ocultamos modal de confirmación y
      // limpiamos identificador de amigo a eliminar. Para actualizar el
      // estado volvemos a asignar la lista de amigos sin el recién
      // eliminado (investigar como actualizar la base de datos).
      let { idAmigoAEliminar } = this.state;

      // Obtenemos al amigo a eliminar
      const amigoAEliminar = this.state.amigos.find(
        (a: amigo) => a.id === idAmigoAEliminar
      ) as amigo | undefined;

      if (!amigoAEliminar) {
        throw new Error(
          "Error, no se encontró al amigo relacionado " +
            `con id ${idAmigoAEliminar}`
        );
      }

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

  cancelarBusquedaHandler = () => {
    // Cancel the search of users
    this.setState({ estaBuscando: false });
  };

  componentDidMount = () => {
    // We fetch the friends related to this user from the server
    console.log("Obteniendo amigos del servidor");
    this.obtenerAmigos();
  };

  obtenerAmigos = () => {
    try {
      // Getting the user data from the authentication context
      let userDetails = this.context;
      let idUsuario = userDetails?.user?.IdUsuario ?? null;

      if (!idUsuario) {
        // Falsy value for the user id, we abort the process
        throw new Error("Id usuario no válido");
      }

      let params = {
        idUsuario,
      };

      // Making an AJAX call to fetch the friends related to this user
      llamadaAjax(AMIGOS_CONTROLLER, "ObtenerAmigosRelacionados", params).then(
        (result) => {
          // Update the state of the friends context
          this.setState({ amigos: result });
        }
      );
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
          onCancel={this.cancelarBusquedaHandler}
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
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonMenuButton />
              </IonButtons>
              <IonTitle>Amigos</IonTitle>
              <IonButtons slot="primary">
                <IonButton>
                  <IonIcon slot="icon-only" icon={person} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {amigos && (
              <IonList>
                {amigos.map((a: amigo) => (
                  <AmigoItem
                    key={a.id}
                    onIniciarEliminacion={() => {
                      this.iniciarEliminacionAmigoHandler(a.id);
                    }}
                    onAbrirChat={this.abrirChatHandler}
                    amigo={a}
                  />
                ))}
              </IonList>
            )}
            {isPlatform("android") && (
              <IonFab horizontal="end" vertical="bottom" slot="fixed">
                <IonFabButton color="light" onClick={this.buscarPersonaHandler}>
                  <IonIcon icon={personAdd}></IonIcon>
                </IonFabButton>
              </IonFab>
            )}
          </IonContent>
        </IonPage>
      </React.Fragment>
    );
  }
}
Amigos.contextType = AuthStateContext;

export default Amigos;

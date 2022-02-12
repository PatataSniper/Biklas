import React, { useState, useContext, useEffect } from "react";
import {
  IonRow,
  IonCol
} from "@ionic/react";
import RutaItem from "./RutaItem";
import AppPage from "../../components/AppPage";
import { AuthContext } from "../../context/authContext";
import { Ruta } from "../../data/rutas-context";
import BKDataContext from "../../data/BKDataContext";

// Preparamos el estado inicial del componente. Para este componente (que
// en principio no será muy complejo) utilizamos el gancho 'useState'
const estadoInicial = {
  rutas: [],
  creando: false
}

const Rutas: React.FC = () => {
  const [state, setState] = useState(estadoInicial);

  // Obtenemos estado de autorización desde el provider context más cercano
  let { authState } = useContext(AuthContext) as any;

  // const iniciarCrearRutaHandler = () => {
  //   setState({ rutas: state.rutas, creando: true});
  // };

  // const cancelarEditarRutaHandler = () => {
  //   setState({ rutas: state.rutas, creando: false});
  // };

  // const aceptarCreacionRutaHandler = (nombre: string, fechaCrea: Date) => {
  //   setState({ rutas: state.rutas, creando: false});
  //   rutasCtx.agregarRuta(nombre, fechaCrea);
  // };

  const obtenerRutas = async () => {
    try {
      const idUsuario = authState.user.IdUsuario;
      if (!idUsuario) {
        // Id de usuario no válido, abortamos el proceso
        throw new Error("Id usuario no válido");
      }

      // Esperamos la respuesta del contexto de datos y actualizamos el contexto local
      setState({ creando: state.creando, rutas: await BKDataContext.Rutas(idUsuario) });
    } catch (ex) {
      console.error(ex);
    }
  }

  // Utilizamos un efecto para cargar las rutas relacionadas. No pasamos ninguna 
  // dependencia para imitar el comportamiento de la función componentDidMount
  useEffect(() => {
    // Obtenemos las rutas relacionadas al usuario firmado
    obtenerRutas();
  }
  , []);

  return (
    <React.Fragment>
      <AppPage titulo="Rutas" esVistaSecundaria>
        {state.rutas.map((reg: Ruta) => (
          <IonRow key={`registro_ruta_${reg.id}`}>
            <IonCol size-md="4" offsetMd="4">
              <RutaItem
                nombre={reg.nombre}
                distancia={reg.distancia}
                fechaUltRecor={reg.fechaUltRecor}
                id={reg.id}
              />
            </IonCol>
          </IonRow>
        ))}
        {/* <IonFab horizontal="end" vertical="bottom" slot="fixed">
          <IonFabButton color="light" onClick={iniciarCrearRutaHandler}>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab> */}
      </AppPage>
      {/* <ModalCrearRuta
        show={estaCreando}
        onCancel={cancelarEditarRutaHandler}
        onSave={aceptarCreacionRutaHandler}
      /> */}
    </React.Fragment>
  );
};

export default Rutas;

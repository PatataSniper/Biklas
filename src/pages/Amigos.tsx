import React, { useState, useRef, useContext } from "react";

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
import { AmigosContext } from "../data/amigos-context";
import ModalBuscarPersona from "../components/ModalBuscarPersona";
import AmigoItem from "../components/AmigoItem";
import { llamadaAjax } from "../bk-utils";
import { AMIGOS_CONTROLLER } from "../bk-constantes";
import { useAuthState } from "../context";

const Amigos: React.FC = () => {
  const DURACION_TOAST = 3000;

  const amigosCtx = useContext(AmigosContext);
  const userDetails = useAuthState();

  const [estadoIniElim, setIniciarEliminacion] = useState(false);
  const [msjToast, setMsjToast] = useState("");
  const [estaBuscando, setEstaBuscando] = useState(false);

  const opcionesDeslizablesRef = useRef<HTMLIonItemSlidingElement>(null);

  const iniciarEliminacionAmigoHandler = () => {
    // Display confirmation element for deleting a friend
    setMsjToast("");
    setIniciarEliminacion(true);
  };

  const eliminarAmigoHandler = () => {
    // User confirmed a friend's deletion
    setIniciarEliminacion(false);
    setMsjToast("Amigo eliminado con éxito...");
  };

  const abrirChatHandler = () => {
    console.log("Enviando mensaje a amigo...");

    // Cerrar elemento seleccionado
    opcionesDeslizablesRef.current?.closeOpened();
  };

  const buscarPersonaHandler = () => {
    // Start the search of users
    setEstaBuscando(true);
  };

  const cancelarBusquedaHandler = () => {
    // Cancel the search of users
    setEstaBuscando(false);
  };

  const obtenerAmigos = () => {
    try {
      // Getting the user data from the authentication context
      let idUsuario = userDetails?.user?.IdUsuario ?? null;

      if (!idUsuario) {
        // Falsy value for the user id, we abort the process
        throw "Id usuario no válido";
      }

      let params = {
        idUsuario
      };

      // Making an AJAX call to fetch the friends related to this user
      llamadaAjax(AMIGOS_CONTROLLER, "ObtenerAmigosRelacionados", params)
      .then(result => {
        // Update the state of the friends context
        amigosCtx.amigos = result;
      });
    } catch (ex) {
      console.error(ex);
    }
  };

  obtenerAmigos();

  return (
    <React.Fragment>
      <ModalBuscarPersona
        show={estaBuscando}
        onCancel={cancelarBusquedaHandler}
      />
      <IonToast
        isOpen={!!msjToast}
        message={msjToast}
        duration={DURACION_TOAST}
        onDidDismiss={() => {
          setMsjToast("");
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
              setIniciarEliminacion(false);
            },
          },
          {
            text: "Eliminar",
            handler: eliminarAmigoHandler,
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
          {amigosCtx.amigos && (
            <IonList>
              {amigosCtx.amigos.map((amigo) => (
                <AmigoItem
                  key={amigo.id}
                  opcionesRef={opcionesDeslizablesRef}
                  onIniciarEliminacion={iniciarEliminacionAmigoHandler}
                  onAbrirChat={abrirChatHandler}
                  amigo={amigo}
                ></AmigoItem>
              ))}
            </IonList>
          )}
          {isPlatform("android") && (
            <IonFab horizontal="end" vertical="bottom" slot="fixed">
              <IonFabButton color="light" onClick={buscarPersonaHandler}>
                <IonIcon icon={personAdd}></IonIcon>
              </IonFabButton>
            </IonFab>
          )}
        </IonContent>
      </IonPage>
    </React.Fragment>
  );
};

export default Amigos;

import React, { useState, useRef, useContext } from 'react';

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
import { personAdd } from 'ionicons/icons';
import AmigosContext from '../data/amigos-context';
import ModalBuscarPersona from '../components/ModalBuscarPersona';
import AmigoItem from '../components/AmigoItem';

const Amigos: React.FC = () =>{
  const DURACION_TOAST = 3000;

  const amigosCtx = useContext(AmigosContext);
  
  const [estadoIniElim, setIniciarEliminacion] = useState(false);
  const [msjToast, setMsjToast] = useState('');
  const [estaBuscando, setEstaBuscando] = useState(false);
  
  const opcionesDeslizablesRef = useRef<HTMLIonItemSlidingElement>(null);

  const iniciarEliminacionAmigoHandler = () => {
    setMsjToast('');
    setIniciarEliminacion(true);
  }
  
  const eliminarAmigoHandler = () => {
    setIniciarEliminacion(false);
    setMsjToast('Amigo eliminado con éxito...')
  }
  
  const abrirChatHandler = () => {
    console.log("Enviando mensaje a amigo...")
    
    // Cerrar elemento seleccionado
    opcionesDeslizablesRef.current?.closeOpened();
  }
  
  const buscarPersonaHandler = () => {
    setEstaBuscando(true);
  }

  const cancelarBusquedaHandler = () => {
    setEstaBuscando(false);
  }

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
            {!isPlatform("android") && (
              <IonButtons slot="end">
                <IonButton onClick={buscarPersonaHandler}>
                  <IonIcon slot="icon-only" icon={personAdd} />
                </IonButton>
              </IonButtons>
            )}
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {amigosCtx.amigos && (
            <IonList>
              {amigosCtx.amigos.map((amigo) => (
                <AmigoItem key={amigo.id}
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
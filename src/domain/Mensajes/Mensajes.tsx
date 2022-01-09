import React, { FunctionComponent } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { person } from "ionicons/icons";

interface MensajesProps {}

const Mensajes: FunctionComponent<MensajesProps> = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonButtons slot="primary">
            <IonButton>
              <IonIcon slot="icon-only" icon={person} />
            </IonButton>
          </IonButtons>
          <IonTitle color="titulo">Mensajes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h2>Mostramos los mensajes</h2>
      </IonContent>
    </IonPage>
  );
};

export default Mensajes;

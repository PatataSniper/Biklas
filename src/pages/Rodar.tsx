import React from "react";
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

const Rodar: React.FC = () => {
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
          <IonTitle>Biklas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h2>Funciona! Vamos a rodar...</h2>
      </IonContent>
    </IonPage>
  );
};

export default Rodar;

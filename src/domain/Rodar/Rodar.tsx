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

interface RodarProps {}

const Rodar: FunctionComponent<RodarProps> = () => {
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
          <IonTitle color="titulo">Biklas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h2>Iniciamos viaje</h2>
      </IonContent>
    </IonPage>
  );
};

export default Rodar;

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
import { notifications } from "ionicons/icons";

const Inicio: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonButtons slot="primary">
            <IonButton>
              <IonIcon slot="icon-only" icon={notifications} />
            </IonButton>
          </IonButtons>
          <IonTitle color="titulo">Biklas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h2>Página de inicio</h2>
      </IonContent>
    </IonPage>
  );
};

export default Inicio;
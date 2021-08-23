import React from "react";
import {IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar} from '@ionic/react';

const Rodar: React.FC = () => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Biklas</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <h2>Funciona! Vamos a rodar...</h2>
        </IonContent>
      </IonPage>
    );
}

export default Rodar;
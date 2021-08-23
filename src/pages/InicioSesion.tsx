import React from "react";
import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";

const InicioSesion: React.FC = () => {
  const onAceptar = () => {
    console.log("Iniciando sesión");
  }
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
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Usuario</IonLabel>
                  <IonInput id="nombre-usuario" type="text" />
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Contraseña</IonLabel>
                  <IonInput id="contraseña-usuario" type="text" />
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonButton expand="block" color="primary" onClick={onAceptar}>
                  Iniciar sesión
                </IonButton>
              </IonCol>
              <IonCol>
                <IonButton expand="block" color="danger">
                  Cancelar
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <a href="/#">Olvidé mi contraseña</a>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonButton expand="block" color="secondary">
                  Crear cuenta
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    );
}

export default InicioSesion
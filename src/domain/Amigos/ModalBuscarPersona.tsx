import React, { useState } from "react";

import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
} from "@ionic/react";

const ModalBuscarPersona: React.FC<{ show: boolean; onCancel: () => void }> = (
  props
) => {
  const [mostrandoResult, setMostrandoResult] = useState(false);
  return (
    <IonModal isOpen={props.show}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Agregar amigo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Nombre</IonLabel>
                <IonInput id="nombre-persona" type="text" />
              </IonItem>
            </IonCol>
          </IonRow>
          {mostrandoResult && (
            <IonRow>
              <IonCol>
                <IonItem>
                  <div>Desplegando resultados...</div>
                </IonItem>
              </IonCol>
            </IonRow>
          )}
          <IonRow>
            <IonCol>
              <IonButton onClick={props.onCancel}>Cancelar</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonModal>
  );
};

export default ModalBuscarPersona;

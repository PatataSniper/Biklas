import React, { useRef, useState } from "react";
import { IonButton, IonCol, IonContent, IonDatetime, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonRow, IonText, IonTitle, IonToolbar } from "@ionic/react"

const ModalCrearRuta: React.FC<{
  show: boolean;
  onCancel: () => void;
  onSave: (nombre: string, fechaCrea: Date) => void
}> = (props) => {
  const [err, setErr] = useState('');

  const nombreRef = useRef<HTMLIonInputElement>(null);
  const fechaCreaRef = useRef<HTMLIonDatetimeElement>(null);

  const aceptarCreacionHandler = () => {
    let nombreIntroducido = nombreRef.current!.value;
    let fechaIntroducida = fechaCreaRef.current!.value;

    if(
      !nombreIntroducido 
      || !fechaIntroducida 
      || nombreIntroducido.toString().trim().length === 0
      || fechaIntroducida.trim().length === 0)
      {
        // Información inválida
        setErr('Introduzca nombre y fecha de creación');
        return;
      }

      setErr('');
      props.onSave(nombreIntroducido.toString(), new Date(fechaIntroducida));
  }
  return (
    <IonModal isOpen={props.show}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Crear Ruta</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          {
            err && (
              <IonRow>
                <IonCol>
                  <IonText color="danger">
                    <p>{err}</p>
                  </IonText>
                </IonCol>
              </IonRow>
            )
          }
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Nombre de ruta</IonLabel>
                <IonInput type="text" ref={nombreRef}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>Fecha de creación</IonLabel>
                <IonDatetime displayFormat="DD MM YYYY" ref={fechaCreaRef} />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow className="ion-text-center">
            <IonCol>
              <IonButton color="dark" fill="clear" onClick={props.onCancel}>
                Cancelar
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton
                expand="block"
                color="secondary"
                onClick={aceptarCreacionHandler}
              >
                Aceptar
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonModal>
  );
};

export default ModalCrearRuta;
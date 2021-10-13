import React, { useRef, useState } from "react";
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  IonToast,
} from "@ionic/react";
import { llamadaAjax } from "../bk-utils";

const InicioSesion: React.FC = () => {
  // Referencias a elementos
  const usuarioInputRef = useRef<HTMLIonInputElement>(null);
  const contraInputRef = useRef<HTMLIonInputElement>(null);

  // Hooks relacionados a elemento 'toast', configuramos el tipo de dato del texto como <string | unknown>
  // ya que no podemos especificar el tipo de dato en el parámetro del catch (de la estructura try-catch)
  const [mostrarToast, setMostrarToast] = useState(false);
  const [textoToast, setTextoToast] = useState<string | unknown>('');

  const onIniciarSesion = () => {
    try{
        // Enviamos credenciales ingresadas por usuario a función de inicio de sesión
        let params = {
          identificador: usuarioInputRef.current!.value,
          contra: contraInputRef.current!.value,
        };
    
        llamadaAjax("Usuarios", "IniciarSesion", params)
          .then((result) => {
            // Éxito en confirmación de credenciales
            console.log(result.usr);
          })
          .catch(err => {
            if (err) {
              // Error que mostraremos al usuario, lo lanzamos para encausarlo con errores
              // de interacción usuario/interfaz (como campos faltantes o con información inválida)
              throw err;
            }
          });
    }
    catch(err) {
      // Mostrar el mensaje de error al usuario utilizando un elemento 'toast'
      setTextoToast(err);
      setMostrarToast(true);
    }
  };

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
                <IonInput
                  ref={usuarioInputRef}
                  id="nombre-usuario"
                  type="text"
                />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Contraseña</IonLabel>
                <IonInput
                  ref={contraInputRef}
                  id="contraseña-usuario"
                  type="text"
                />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton
                expand="block"
                color="primary"
                onClick={onIniciarSesion}
              >
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
        <IonToast
          isOpen={mostrarToast}
          onDidDismiss={() => setMostrarToast(false)}
          message={textoToast}
          position="bottom"
          duration={3000}
          color="warning"
        />
      </IonContent>
    </IonPage>
  );
};

export default InicioSesion;

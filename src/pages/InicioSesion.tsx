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
import {
  loginUser,
  logout,
  AuthDispatchContext,
  AuthStateContext,
} from "../context/index";

const InicioSesion: React.FC = () => {
  // Referencias a elementos
  const usuarioInputRef = useRef<HTMLIonInputElement>(null);
  const contraInputRef = useRef<HTMLIonInputElement>(null);

  // Hooks relacionados a elemento 'toast', configuramos el tipo de dato del texto como 'any'
  // ya que no podemos especificar el tipo de dato en el parámetro del catch (de la estructura try-catch),
  // sin embargo, siempre deberá ser string
  const [mostrarToast, setMostrarToast] = useState(false);
  const [textoToast, setTextoToast] = useState<any>("");

  // Obtenemos el método 'dispatch'
  const dispatch = React.useContext(AuthDispatchContext);

  // Obtenemos mensaje de error y estado de cargado desde contexto
  const { loading, errorMessage } = React.useContext(AuthStateContext);

  /**
   * Manejador. Valida información de inicio de sesión. Muestra
   * errores ocurridos en elemento 'toast'. Almacena información
   * de usuario tras inicio de sesión exitoso (credenciales y
   * token de autenticación)
   */
  const onIniciarSesion = () => {
    try {
      // Enviamos credenciales ingresadas por usuario a función
      // de inicio de sesión
      let params = {
        identificador: usuarioInputRef.current!.value,
        contra: contraInputRef.current!.value,
      };

      if (!params.identificador || !params.contra) {
        // Ambos datos son obligatorios
        throw "Especifique nombre de usuario y contraseña";
      }

      loginUser(dispatch, params)
        .then((data) => {
          // Éxito en el inicio de sesión
          console.log(data);
        })
        .catch((err) => {
          // Error en el inicio de sesión
          if (err) {
            // Error. Lo mostramos al usuario, debería encausarse con errores de interacción
            // usuario/interfaz (como campos faltantes o con información inválida) sin
            // embargo no se encausa ya que este error ocurre en un proceso asíncrono
            setTextoToast(err);
            setMostrarToast(true);
          }
        });
    } catch (err) {
      setTextoToast(err);
      setMostrarToast(true);
    }
  };

  const onCerrarSesion = () => {
    logout(dispatch);
    setTextoToast("Se ha cerrado la sesión");
    setMostrarToast(true);
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
                disabled={loading}
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
              <IonButton
                expand="block"
                color="primary"
                onClick={onCerrarSesion}
              >
                Cerrar sesión
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

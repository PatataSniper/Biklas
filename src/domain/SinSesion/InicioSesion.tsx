import React, { useRef, useState } from "react";
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";

import { loginUser, AuthContext } from "../../context/authContext/index";
import { RUTA_PAGINA_PRINCIPAL, TITULO_PAGINA } from "../../bk-constantes";
import { useHistory } from "react-router";

interface InicioSesionProps {}

const InicioSesion: React.FC<InicioSesionProps> = () => {
  // Nota: Este componente no utiliza a 'AppPage' para el renderizado de la interfaz.
  // Se trata de una página muy simple que no utiliza elementos comunes como el botón
  // de despliegue de menú o el título de página personalizado.

  // Referencias a elementos
  const usuarioInputRef = useRef<HTMLIonInputElement>(null);
  const contraInputRef = useRef<HTMLIonInputElement>(null);

  // Hooks relacionados a elemento 'toast', configuramos el tipo de dato del texto como 'any'
  // ya que no podemos especificar el tipo de dato en el parámetro del catch (de la estructura try-catch),
  // sin embargo, siempre deberá ser string
  const [mostrarToast, setMostrarToast] = useState(false);
  const [textoToast, setTextoToast] = useState<any>("");

  // Hook para acceder al sistema de navegación programática en React
  const history = useHistory();

  // Obtenemos estado de autorización y función dispatch desde el provider context más cercano
  let { authState, dispatch } = React.useContext(AuthContext) as any;

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
        throw new Error("Especifique nombre de usuario y contraseña");
      }

      loginUser(dispatch, params)
        .then(() => {
          // Éxito en el inicio de sesión, redireccionamos a pantalla principal
          history.push(RUTA_PAGINA_PRINCIPAL);
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
      // Estar al pendiente, fallará si no recibe un objeto de error válido
      setTextoToast(err);
      setMostrarToast(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle color="titulo">{TITULO_PAGINA}</IonTitle>
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
                  type="password"
                />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton
                fill="solid"
                expand="block"
                color="primary"
                onClick={onIniciarSesion}
                disabled={authState.loading}
              >
                Iniciar sesión
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton routerLink="/creacionUsuario" fill="solid" expand="block" color="secondary">
                Crear cuenta
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton expand="full" routerLink="/recuperacionContra" fill="clear">Olvidé mi contraseña</IonButton>
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

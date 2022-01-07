import React from "react";
import {
  IonMenu,
  IonContent,
  IonList,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { bicycle, mapSharp, person, personCircle } from "ionicons/icons";
import { AuthContext } from "../context/authContext";

const MenuLateral: React.FC = () => {
  // Obtenemos estado de autorización y función dispatch desde el provider context más cercano
  const { authState } = React.useContext(AuthContext) as any;

  /**
   * Función que nos idndica si el usuario está firmado o no (es decir si tiene acceso)
   * @returns {boolean} Booleano indicando si el usuario está firmado o no (es decir si tiene
   * acceso)
   */
  const tieneAcceso = (): boolean => {
    // Todo. Intentar refactorizar función dentro de contexto de autorización
    return Boolean(authState.user?.IdUsuario);
  };

  return (
    <IonMenu contentId="main">
      <IonContent>
        <IonList>
          <IonMenuToggle key="rodar">
            <IonItem button routerLink="/rodar" routerDirection="none">
              <IonIcon slot="start" icon={bicycle} />
              <IonLabel>Rodar</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle key="rutas">
            <IonItem button routerLink="/rutas" routerDirection="none">
              <IonIcon slot="start" icon={mapSharp} />
              <IonLabel>Rutas</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle key="amigos">
            <IonItem button routerLink="/amigos" routerDirection="none">
              <IonIcon slot="start" icon={person} />
              <IonLabel>Amigos</IonLabel>
            </IonItem>
          </IonMenuToggle>
          {!tieneAcceso() && (
            <IonMenuToggle key="inicioSesion">
              <IonItem button routerLink="/inicioSesion" routerDirection="none">
                <IonIcon slot="start" icon={personCircle} />
                <IonLabel>Iniciar sesión</IonLabel>
              </IonItem>
            </IonMenuToggle>
          )}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default MenuLateral;

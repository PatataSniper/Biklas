import React from "react"
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { bicycle, mapSharp, person } from "ionicons/icons";

const MenuLateral: React.FC = () => {
    return (
        <IonMenu contentId="main">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Biklas</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <IonMenuToggle key="rodar">
                <IonItem button routerLink="/rodar" routerDirection="none">
                  <IonIcon slot="start" icon={bicycle} />
                  <IonLabel>Rodar</IonLabel>
                </IonItem>
              </IonMenuToggle>
              <IonMenuToggle key="rutas">
                <IonItem
                  button
                  routerLink="/rutas"
                  routerDirection="none"
                >
                  <IonIcon slot="start" icon={mapSharp} />
                  <IonLabel>Rutas</IonLabel>
                </IonItem>
              </IonMenuToggle>
              <IonMenuToggle key="amigos">
                <IonItem
                  button
                  routerLink="/amigos"
                  routerDirection="none"
                >
                  <IonIcon slot="start" icon={person} />
                  <IonLabel>Amigos</IonLabel>
                </IonItem>
              </IonMenuToggle>
            </IonList>
          </IonContent>
        </IonMenu>
    )
}

export default MenuLateral
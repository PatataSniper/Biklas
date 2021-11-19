import React from "react";
import {
    IonItemSliding,
    IonItemOption,
    IonIcon,
    IonItemOptions,
    IonItem,
    IonLabel
 } from "@ionic/react";

import { trash, mail } from "ionicons/icons";
import { amigo } from '../data/amigos-context';

const AmigoItem: React.FC<{
  opcionesRef: React.Ref<HTMLIonItemSlidingElement>,
  onIniciarEliminacion: () => void,
  onAbrirChat: () => void,
  amigo: amigo
}> = (props) => {
  return (
    <IonItemSliding ref={props.opcionesRef}>
      <IonItemOptions color="danger" side="start">
        <IonItemOption onClick={props.onIniciarEliminacion}>
          <IonIcon slot="icon-only" icon={trash}></IonIcon>
        </IonItemOption>
      </IonItemOptions>
      <IonItem>
        <IonLabel>
          <h2>{`${props.amigo.nombre} ${props.amigo.apellidos}`}</h2>
          <h3>{`${props.amigo.kmRecorridos} km. recorridos`}</h3>
        </IonLabel>
      </IonItem>
      <IonItemOptions>
        <IonItemOption color="secondary" onClick={props.onAbrirChat}>
          <IonIcon slot="icon-only" icon={mail}></IonIcon>
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default AmigoItem;
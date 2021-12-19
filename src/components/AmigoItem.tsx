import React from "react";
import {
  IonItemSliding,
  IonItemOption,
  IonIcon,
  IonItemOptions,
  IonItem,
  IonLabel,
} from "@ionic/react";

import { trash, mail } from "ionicons/icons";
import { amigo } from "../data/amigos-context";

const AmigoItem: React.FC<{
  // Change: We are using this component inside a class component,
  // and in those type of components we cannot use hooks like 'useRef'
  // opcionesRef: React.Ref<HTMLIonItemSlidingElement>,
  onIniciarEliminacion: () => void;
  onAbrirChat: () => void;
  amigo: amigo;
}> = (props) => {
  return (
    <IonItemSliding>
      <IonItem>
        <IonLabel>
          <h2>{`${props.amigo.nombre} ${props.amigo.apellidos}`}</h2>
          <h3>{`${props.amigo.kmRecorridos} km. recorridos`}</h3>
        </IonLabel>
      </IonItem>
      <IonItemOptions side="start">
        <IonItemOption color="danger" onClick={props.onIniciarEliminacion}>
          <IonIcon slot="icon-only" icon={trash}></IonIcon>
        </IonItemOption>
      </IonItemOptions>
      <IonItemOptions side="end">
        <IonItemOption color="secondary" onClick={props.onAbrirChat}>
          <IonIcon slot="icon-only" icon={mail}></IonIcon>
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default AmigoItem;

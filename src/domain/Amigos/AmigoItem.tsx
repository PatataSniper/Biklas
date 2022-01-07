import React from "react";
import { IonItem, IonLabel, IonAvatar, IonButton, IonIcon, IonModal, IonContent, IonPopover, IonList } from "@ionic/react";

import { ellipsisVerticalOutline } from "ionicons/icons";
import { amigo } from "../../data/amigos-context";

const estadoInicial = {
  mostrarModal: false,
  evento: undefined
};

const amigoItemReductor = (
  estado: any,
  accion: {
    tipo: string;
    evento?: any
  }
) => {
  switch (accion.tipo) {
    case "MOSTRAR_OPCIONES":
      return {
        ...estado,
        mostrarOpciones: true,
        evento: accion.evento
      };
      case "OCULTAR_OPCIONES":
        return{
          ...estado,
          mostrarOpciones: false,
          evento: undefined
        }
  }
};

const AmigoItem: React.FC<{
  // Change: We are using this component inside a class component,
  // and in those type of components we cannot use hooks like 'useRef'
  // opcionesRef: React.Ref<HTMLIonItemSlidingElement>,
  onIniciarEliminacion: () => void;
  onAbrirChat: () => void;
  amigo: amigo;
}> = (props) => {
  let [estado, dispatch] = React.useReducer(amigoItemReductor, estadoInicial);

  const enMostrarOpciones = (e: any) => {
    // Mostramos el modal de opciones modificando el estado del componente
    e.persist();
    dispatch({tipo: "MOSTRAR_OPCIONES", evento: e})
  }

  return (
    <IonItem>
      <IonAvatar>
        <img src="https://media.istockphoto.com/photos/male-silhouette-as-avatar-profile-picture-picture-id519078721?k=6&m=519078721&s=612x612&w=0&h=N80uhQg1D7QpAgccoDxkFMRqrGsTfhf6KX1NRhsxWPw=" />
      </IonAvatar>
      <IonLabel>
        <h2>{props.amigo.nombreUsuario}</h2>
        <h3>{`${props.amigo.nombre} ${props.amigo.apellidos}`}</h3>
        <p>{`${props.amigo.kmRecorridos} km. recorridos`}</p>
      </IonLabel>
      <IonIcon onClick={enMostrarOpciones} icon={ellipsisVerticalOutline}></IonIcon>
      
      <IonPopover
        cssClass='my-custom-class'
        event={estado.evento}
        isOpen={estado.mostrarOpciones}
        onDidDismiss={() => dispatch({ tipo: "OCULTAR_OPCIONES"})}
      >
        <IonList lines="full">
          <IonItem onClick={props.onAbrirChat}>
            Enviar mensaje
          </IonItem>
          <IonItem onClick={props.onIniciarEliminacion}>
            Eliminar
          </IonItem>
        </IonList>
      </IonPopover>
    </IonItem>
  );
};

export default AmigoItem;

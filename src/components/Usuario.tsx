import { IonAvatar, IonItem, IonLabel } from "@ionic/react";
import * as React from "react";
import { usuario } from "../data/usuarios-context";

interface Props {
  usuario: usuario;
}

const Usuario: React.FunctionComponent<Props> = (props) => {
  const { usuario } = props;
  return (
    <IonItem>
      <IonAvatar>
        <img alt=""
        src="https://media.istockphoto.com/photos/male-silhouette-as-avatar-profile-picture-picture-id519078721?k=6&m=519078721&s=612x612&w=0&h=N80uhQg1D7QpAgccoDxkFMRqrGsTfhf6KX1NRhsxWPw=" />
      </IonAvatar>
      <IonLabel>
        <h2>{usuario.nombre}</h2>
        <h3>
          {usuario.nombre} {props.usuario.apellidos}
        </h3>
        <p>{usuario.kmRecorridos} km. recorridos</p>
      </IonLabel>
      {props.children}
    </IonItem>
  );
};

export default Usuario;

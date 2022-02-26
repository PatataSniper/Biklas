import React, { Fragment } from "react";

import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonTitle,
  IonButtons,
  IonIcon,
  IonToolbar,
  IonContent,
  IonLabel,
  IonRouterLink,
  IonAvatar,
} from "@ionic/react";
import { ellipsisVertical } from "ionicons/icons";
import estilos from "./RutaItem.module.scss";

const RutaItem: React.FC<{
  nombre: string;
  distancia: string;
  fechaCreacion: Date;
  id: number;
  esPropia: boolean;
}> = (props) => {
  return (
    <Fragment>
      {!props.esPropia && (
        // No se trata de una ruta propia del usuario, mostramos información del perfil
        // autor de la ruta
        <div className={estilos.perfilRuta}>
          <div className={estilos.perfilRutaInfo}>
            <IonRouterLink>
              <IonAvatar>
                <img alt="Avatar ruta" src="https://wallpapercave.com/wp/wp5389930.jpg" />
              </IonAvatar>
            </IonRouterLink>

            <IonRouterLink>
              <p>Saúl Muñoz García</p>
            </IonRouterLink>
          </div>
          <div className={estilos.encabezadoRutaMas}>
            <IonIcon icon={ellipsisVertical} />
          </div>
        </div>
      )}
      <div className={estilos.encabezadoRuta}>
        <div className={estilos.encabezadoRutaInfo}>
            <h3>
              {props.nombre} | {props.distancia}
            </h3>
          <p>{props.fechaCreacion}</p>
        </div>
        {props.esPropia && (
          // Es ruta propia del usuario, no se muestra información del perfil, mostramos
          // el botón de acciones extra en este punto
          <div className={estilos.encabezadoRutaMas}>
            <IonIcon icon={ellipsisVertical} />
          </div>
        )}
      </div>
      <IonCardContent>
        <img
          alt=""
          src="https://maps.googleapis.com/maps/api/staticmap?center=20.700195,-103.330416&zoom=15&size=400x400&key=AIzaSyAr6i9JuVsBo00u1-4X5zvtpgy-X9q9p0A&map_id=ad07c3f54e7a1a2b"
        ></img>
      </IonCardContent>
    </Fragment>
  );
};

export default RutaItem;

import React, { Fragment } from "react";

import {
  IonIcon,
  IonRouterLink,
  IonAvatar,
} from "@ionic/react";
import {
  arrowDownCircleOutline,
  arrowUpCircleOutline,
  arrowUpCircleSharp,
  bookmarkOutline,
  ellipsisVertical,
} from "ionicons/icons";
import estilos from "./RutaItem.module.scss";
import { GOOGLE_DEV_API_KEY } from "../../config/credentials-config";

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
                <img
                  alt="Avatar ruta"
                  src="https://wallpapercave.com/wp/wp5389930.jpg"
                />
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

      <div
        className={estilos.imagenRuta}
        style={{
          backgroundImage: `url("https://maps.googleapis.com/maps/api/staticmap?center=20.700195,-103.330416&zoom=15&size=400x400&key=${GOOGLE_DEV_API_KEY}")`,
          backgroundPosition: "center, center",
          backgroundSize: "cover",
        }}
      ></div>

      <div className={estilos.contenedorAccionesRuta}>
        <div className={estilos.accionesRuta}>
          <IonIcon
            color={"success"}
            icon={
              arrowUpCircleSharp
            } /*onClick={ e => addLike(e, post.id, post.liked) }*/
          />
          <IonIcon color="danger" icon={arrowDownCircleOutline} />
        </div>

        <div className={estilos.bookmarkRuta}>
          <IonIcon icon={bookmarkOutline} />
        </div>
      </div>
    </Fragment>
  );
};

export default RutaItem;

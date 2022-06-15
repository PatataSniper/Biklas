import React, { Fragment } from "react";

import {
  IonIcon,
  IonRouterLink,
  IonAvatar,
} from "@ionic/react";
import {
  arrowDownCircleOutline,
  arrowUpCircleSharp,
  bookmarkOutline,
  ellipsisVertical,
} from "ionicons/icons";
import estilos from "./RutaItem.module.scss";
import { GOOGLE_DEV_API_KEY } from "../../config/credentials-config";
import { TRAZADO_RUTAS_ALMAC_COLOR, TRAZADO_RUTAS_ALMAC_PESO } from "../../bk-constantes";

const RutaItem: React.FC<{
  nombre: string;
  distancia: string;
  fechaCreacion: Date;
  id: number;
  esPropia: boolean;
  coordenadas: string[];
}> = (props) => {
  const urlRuta = () => {
    return `url("https://maps.googleapis.com/maps/api/staticmap?size=400x400${describirRuta(props.coordenadas)}&key=${GOOGLE_DEV_API_KEY}")`;
  }

  const describirRuta = (coordenadas: string[]) => {
    return `&path=${estiloRuta()}${prepararCoordenadas(coordenadas)}`
  }

  /**
   * Prepara el estilo a aplicar al trazado de la ruta
   * @returns {string} El estilo de la ruta
   */
  const estiloRuta = () => {
    return `color:${TRAZADO_RUTAS_ALMAC_COLOR}|weight:${TRAZADO_RUTAS_ALMAC_PESO}`
  }

  /**
   * Prepara la cadena con coordenadas representando la ruta
   * @param coordenadas Las coordenadas de la ruta
   * @returns {string} Coordenadas almacenadas en cadena, separadas por |
   */
  const prepararCoordenadas = (coordenadas: string[]): string => {
    let str = '';
    for(const co of coordenadas){
      // Agregamos las coordenadas separadas por |. Las coordenadas de cada vértice
      // ya deberán venir con el formato correcto ('x' y 'y' separadas por coma)
      str += `|${co}`;
    }

    return str;
  }

  // No utilizada ya que utilizamos el cálculo de centro y zoom proveeído por
  // google maps. Conservada por si pudiera llegar a ser útil
  const centroYZoomRuta = (coordenadas: string[]): string => {
    // Mínimo y máximo para X y Y
    let maxX, minX, maxY, minY;

    // Iteramos coordenadas para obtener los valores mínimos y máximos
    for(let c of coordenadas){
      const [x, y] = c.split(',').map(v => Number(v));

      maxX = maxX ? maxX : x;
      maxY = maxY ? maxY : y;
      minX = minX ? minX : x;
      minY = minY ? minY : y;

      maxX = x > maxX ? x : maxX;
      maxY = y > maxY ? y : maxY;
      minX = x < minX ? x : minX;
      minY = y < minY ? y : minY;
    }

    maxX = maxX ?? 0;
    maxY = maxY ?? 0;
    minX = minX ?? 0;
    minY = minY ?? 0;


    // Diferencia en X y en Y
    const difX = maxX - minX;
    const difY = maxY - minY;

    // Coordenadas centrales
    const centX = maxX - difX / 2;
    const centY = maxY - difY / 2;

    // Calculamos el zoom necesario para mostrar toda la ruta
    // Máxima diferencia
    const maxDif = difX > difY ? difX : difY;
    console.log(maxDif);

    return `center=${centX},${centY}`;
  }

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
          backgroundImage: urlRuta(),
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

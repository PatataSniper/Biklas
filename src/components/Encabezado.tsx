import React, { FunctionComponent } from "react";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { notificationsOutline } from "ionicons/icons";
import { TITULO_PAGINA } from "../bk-constantes";

interface EncabezadoProps {
  // Título a mostrar en el encabezado
  titulo?: string;

  // Nos indica si el encabezado se desplegará para una vista secundaria
  // o para una vista principal (principal por defecto)
  esVistaSecundaria?: boolean;
}

const Encabezado: FunctionComponent<EncabezadoProps> = (
  props: EncabezadoProps
) => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          {props.esVistaSecundaria ? <IonBackButton defaultHref="/tabs/inicio" /> : <IonMenuButton />}
        </IonButtons>
        <IonButtons slot="primary">
          <IonButton>
            <IonIcon slot="icon-only" icon={notificationsOutline} />
          </IonButton>
        </IonButtons>
        <IonTitle color="titulo">{props.titulo ?? TITULO_PAGINA}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default Encabezado;

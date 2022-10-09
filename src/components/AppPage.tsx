import { IonContent, IonPage } from "@ionic/react";
import React, { FunctionComponent } from "react";
import { ClientConfig } from "../config/client-config";
import Encabezado from "./Encabezado";

interface AppPageProps {
  // Título a mostrar en el encabezado
  titulo?: string;

  // Nos indica si el encabezado se desplegará para una vista principal
  // o para una vista secundaria
  esVistaSecundaria?: boolean;
}

const AppPage: FunctionComponent<AppPageProps> = (props) => {
  return (
    <IonPage>
      <Encabezado titulo={props.titulo} esVistaSecundaria={props.esVistaSecundaria} />
      <IonContent>{props.children}</IonContent>
      Cadena de conexión: {ClientConfig.URL_API}
    </IonPage>
  );
};

export default AppPage;

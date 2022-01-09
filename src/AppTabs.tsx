import {
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { bicycle, home, mail } from "ionicons/icons";
import React, { FunctionComponent } from "react";
import { Route } from "react-router-dom";
import Inicio from "./domain/Inicio/Inicio";
import Mensajes from "./domain/Mensajes/Mensajes";
import Rodar from "./domain/Rodar/Rodar";

interface Props {}

const AppTabs: FunctionComponent<Props> = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/tabs/inicio" component={Inicio} exact />
        <Route path="/tabs/rodar" component={Rodar} exact />
        <Route path="/tabs/mensajes" component={Mensajes} exact />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="inicio" href="/tabs/inicio">
          <IonIcon icon={home} />
        </IonTabButton>

        <IonTabButton tab="rodar" href="/tabs/rodar">
          <IonIcon icon={bicycle} />
        </IonTabButton>

        <IonTabButton tab="mensajes" href="/tabs/mensajes">
          <IonIcon icon={mail} />
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default AppTabs;

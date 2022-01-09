import { IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React, { FunctionComponent } from "react";
import { Redirect, Route } from "react-router-dom";
import AppTabs from "./AppTabs";
import MenuLateral from "./components/MenuLateral";
import Amigos from "./domain/Amigos/Amigos";
import InicioSesion from "./domain/InicioSesion/InicioSesion";
import Ruta from "./domain/Rutas/Ruta";
import Rutas from "./domain/Rutas/Rutas";

interface Props {}

const AppRouter: FunctionComponent<Props> = () => {
  // Implementamos una barra de navegación y un menu lateral gracias a la respuesta 
  // de Mirko Lucic https://stackoverflow.com/questions/62555027/how-to-combine-side-menu-with-tab-navigation-in-ion-react
  return (
    <IonReactRouter>
      <IonSplitPane contentId="main">
        <MenuLateral />
        <IonRouterOutlet id="main">
          <Route path="/tabs" component={AppTabs} />
          <Route path="/rutas/:id" component={Ruta} />
          <Route path="/rutas" component={Rutas} />
          <Route path="/amigos" component={Amigos} />
          <Route path="/inicioSesion" component={InicioSesion} />
          <Redirect exact from="/" to="tabs/inicio" />
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  );
};

export default AppRouter;

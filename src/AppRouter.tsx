import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React, { FunctionComponent } from "react";
import { Redirect } from "react-router-dom";
import { AppRoute } from "./components/AppRoute";
import MenuLateral from "./components/MenuLateral";
import Amigos from "./domain/Amigos/Amigos";
import Rodar from "./domain/Inicio/Inicio";
import InicioSesion from "./domain/InicioSesion/InicioSesion";
import Ruta from "./domain/Rutas/Ruta";
import Rutas from "./domain/Rutas/Rutas";

interface Props {}

const AppRouter: FunctionComponent<Props> = () => {
  return (
    <IonReactRouter>
      <MenuLateral />
      <IonRouterOutlet id="main">
        {/* <AppRoute component={Filtro} path="/filtro" isPrivate={true} /> */}
        <AppRoute component={Rodar} path="/rodar" isPrivate={true} />
        <AppRoute component={Ruta} path="/rutas/:id" isPrivate={true} />
        <AppRoute component={Rutas} path="/rutas" isPrivate={true} />
        <AppRoute component={Amigos} path="/amigos" isPrivate={true} />
        <AppRoute
          component={InicioSesion}
          path="/inicioSesion"
          isPrivate={false}
        />
        <Redirect exact from="/" to="/rodar" />
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default AppRouter;
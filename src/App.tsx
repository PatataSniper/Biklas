import React from "react";

import { IonApp, IonRouterOutlet } from "@ionic/react";

import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import Rodar from "./pages/Rodar";
import Rutas from "./pages/Rutas";
import MenuLateral from "./components/MenuLateral";
import Ruta from "./pages/Ruta";
import Filtro from "./pages/Amigos";
import Amigos from "./pages/Amigos";
import InicioSesion from "./pages/InicioSesion";
import { AppRoute } from "./components/AppRoute";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/theme.css";

import RutasContextProvider from "./data/RutasContextProvider";
import AmigosContextProvider from "./data/AmigosContextProvider";

// Encontrar la manera de refactorizar rutas en aplicaciones programadas
// con Ionic React
// import routes from "./config/routes";
import { AuthProvider } from "./context";

const App: React.FC = () => {
  return (
    <IonApp>
      <AuthProvider>
        <IonReactRouter>
          <MenuLateral />
          <RutasContextProvider>
            <IonRouterOutlet id="main">
              <AppRoute component={Filtro} path="/filtro" isPrivate={true} />
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
          </RutasContextProvider>
        </IonReactRouter>
      </AuthProvider>
    </IonApp>
  );
};

export default App;

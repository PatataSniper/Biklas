import { IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React, { FunctionComponent } from "react";
import { Redirect, Route } from "react-router-dom";
import AppTabs from "./AppTabs";
import MenuLateral from "./components/MenuLateral";
import { AuthContext } from "./context/authContext";
import Amigos from "./domain/Amigos/Amigos";
import Configuracion from "./domain/Configuracion/Configuracion";
import InicioSesion from "./domain/SinSesion/InicioSesion";
import Ruta from "./domain/Rutas/Ruta";
import Rutas from "./domain/Rutas/Rutas";
import CreacionUsuario from "./domain/SinSesion/CreacionUsuario";
import RecuperacionContra from "./domain/SinSesion/RecuperacionContra";

interface Props {}

const AppRouter: FunctionComponent<Props> = () => {
  // Obtenemos estado de autorización desde el provider context más cercano
  const { authState } = React.useContext(AuthContext) as any;

  /**
   * Función que nos idndica si el usuario está firmado o no (es decir si tiene acceso)
   * @returns {boolean} Booleano indicando si el usuario está firmado o no (es decir si tiene
   * acceso)
   */
  const tieneAcceso = (): boolean => {
    // Todo. Intentar refactorizar función dentro de contexto de autorización
    return Boolean(authState.user?.IdUsuario);
  };

  // Implementamos una barra de navegación y un menu lateral gracias a la respuesta
  // de Mirko Lucic https://stackoverflow.com/questions/62555027/how-to-combine-side-menu-with-tab-navigation-in-ion-react
  return (
    <React.Fragment>
      {tieneAcceso() && (
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <MenuLateral />
            <IonRouterOutlet id="main">
              <Route path="/tabs" component={AppTabs} />
              <Route path="/rutas/:id" component={Ruta} />
              <Route path="/rutas" component={Rutas} />
              <Route path="/amigos" component={Amigos} />
              <Route path="/configuracion" component={Configuracion} />
              <Redirect to="tabs/inicio" />
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      )}
      {!tieneAcceso() && (
        <IonReactRouter>
          <IonRouterOutlet id="no-login">
            <Route path="/inicioSesion" component={InicioSesion} />
            <Route path="/creacionUsuario" component={CreacionUsuario} />
            <Route path="/recuperacionContra" component={RecuperacionContra} />
            <Redirect to="/inicioSesion" />
          </IonRouterOutlet>
        </IonReactRouter>
      )}
    </React.Fragment>
  );
};

export default AppRouter;

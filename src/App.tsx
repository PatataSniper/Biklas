import React from 'react';

import 
{ 
  IonApp, 
  IonRouterOutlet, 
} from '@ionic/react';

import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Rodar from './pages/Rodar'
import Rutas from './pages/Rutas';
import MenuLateral from "./components/MenuLateral"

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/theme.css';
import Ruta from './pages/Ruta';
import Filtro from './pages/Amigos';
import Amigos from './pages/Amigos';

import RutasContextProvider from './data/RutasContextProvider';
import AmigosContextProvider from './data/AmigosContextProvider';

const App: React.FC = () => {

  return (
    <IonApp>
      <IonReactRouter>
        <MenuLateral />
        <RutasContextProvider>
          <IonRouterOutlet id="main">
            <Route path="/filtro" exact>
              <Filtro />
            </Route>
            <Route path="/" exact>
              <Rodar></Rodar>
            </Route>
            <Route path="/rodar" exact>
              <Rodar></Rodar>
            </Route>
            <Route path="/rutas/:id">
              <Ruta />
            </Route>
            <Route path="/rutas" exact>
              <Rutas></Rutas>
            </Route>
            <Route path="/amigos" exact>
              <AmigosContextProvider>
                <Amigos />
              </AmigosContextProvider>
            </Route>
            <Redirect to="/rodar" />
          </IonRouterOutlet>
        </RutasContextProvider>
        {/* <IonTabBar slot="bottom">
            <IonTabButton tab="rodar" href="/rodar">
              <IonIcon icon={bicycle}></IonIcon>
              <IonLabel>Rodar</IonLabel>
            </IonTabButton>
            <IonTabButton tab="rutas" href="/rutas">
              <IonIcon icon={mapSharp}></IonIcon>
              <IonLabel>Rutas</IonLabel>
            </IonTabButton>
          </IonTabBar> */}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

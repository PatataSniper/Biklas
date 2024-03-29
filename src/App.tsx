import React from "react";

import { IonApp } from "@ionic/react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
// Todo. Investigar las siguientes utilidades
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/theme.css";

import { AuthContextProvider } from "./context/authContext";
import AppRouter from "./AppRouter";

const App: React.FC = () => {
  return (
    <IonApp>
      <AuthContextProvider>
          <AppRouter/>
      </AuthContextProvider>
    </IonApp>
  );
};

export default App;

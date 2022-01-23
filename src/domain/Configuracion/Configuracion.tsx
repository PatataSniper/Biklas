import { IonItem, IonLabel, IonList, IonToast } from "@ionic/react";
import React, { FunctionComponent, useState } from "react";
import AppPage from "../../components/AppPage";
import { AuthContext, logout } from "../../context/authContext";

interface ConfiguracionProps {}

const Configuracion: FunctionComponent<ConfiguracionProps> = () => {
  let { dispatch } = React.useContext(AuthContext) as any;
  const [mostrarToast, setMostrarToast] = useState(false);
  const [textoToast, setTextoToast] = useState<any>("");

  const onCerrarSesion = () => {
    logout(dispatch);
    setTextoToast("Se ha cerrado la sesión");
    setMostrarToast(true);
  };
  
  return (
    <AppPage titulo="Configuración" esVistaSecundaria>
      <IonList>
        <IonItem onClick={onCerrarSesion}>
          <IonLabel>
            <p>Cerrar sesión</p>
          </IonLabel>
        </IonItem>
      </IonList>
      <IonToast
        isOpen={mostrarToast}
        onDidDismiss={() => setMostrarToast(false)}
        message={textoToast}
        position="bottom"
        duration={3000}
        color="warning"
      />
    </AppPage>
  );
};

export default Configuracion;

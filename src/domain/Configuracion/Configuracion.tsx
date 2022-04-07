import { IonItem, IonLabel, IonList, IonToast } from "@ionic/react";
import React, { FunctionComponent, useState } from "react";
import { useHistory } from "react-router";
import { RUTA_PAGINA_SIN_SESION } from "../../bk-constantes";
import AppPage from "../../components/AppPage";
import { AuthContext, logout } from "../../context/authContext";

interface ConfiguracionProps {}

const Configuracion: FunctionComponent<ConfiguracionProps> = () => {
  let { dispatch } = React.useContext(AuthContext) as any;
  const [mostrarToast, setMostrarToast] = useState(false);
  const [textoToast, setTextoToast] = useState<any>("");

  // Hook para acceder al sistema de navegación programática en React
  const history = useHistory();

  const onCerrarSesion = () => {
    logout(dispatch);
    history.push(RUTA_PAGINA_SIN_SESION);
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

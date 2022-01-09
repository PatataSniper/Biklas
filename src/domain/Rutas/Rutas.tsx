import React, { useState, useContext } from "react";
import {
  IonRow,
  IonCol,
  isPlatform,
  IonFab,
  IonFabButton,
  IonIcon
} from "@ionic/react";
import { add } from "ionicons/icons";
import ModalCrearRuta from "./ModalCrearRuta";
import RutaItem from "./RutaItem";
import RutasContext from "../../data/rutas-context";
import AppPage from "../../components/AppPage";

const Rutas: React.FC = () => {
  const [estaCreando, setEstaCreando] = useState(false);

  const rutasCtx = useContext(RutasContext);

  const iniciarCrearRutaHandler = () => {
    setEstaCreando(true);
  };

  const cancelarEditarRutaHandler = () => {
    setEstaCreando(false);
  };

  const aceptarCreacionRutaHandler = (nombre: string, fechaCrea: Date) => {
    rutasCtx.agregarRuta(nombre, fechaCrea);
    setEstaCreando(false);
  };

  return (
    <React.Fragment>
      <AppPage titulo="Rutas" esVistaSecundaria>
        {rutasCtx.rutas.map((reg) => (
          <IonRow key={`registro_ruta_${reg.id}`}>
            <IonCol size-md="4" offsetMd="4">
              <RutaItem
                nombre={reg.nombre}
                distancia={reg.distancia}
                fechaUltRecor={reg.fechaUltRecorr}
                id={reg.id}
              />
            </IonCol>
          </IonRow>
        ))}
        {isPlatform("android") && (
          <IonFab horizontal="end" vertical="bottom" slot="fixed">
            <IonFabButton color="light" onClick={iniciarCrearRutaHandler}>
              <IonIcon icon={add}></IonIcon>
            </IonFabButton>
          </IonFab>
        )}
      </AppPage>
      <ModalCrearRuta
        show={estaCreando}
        onCancel={cancelarEditarRutaHandler}
        onSave={aceptarCreacionRutaHandler}
      />
    </React.Fragment>
  );
};

export default Rutas;

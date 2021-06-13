import React, {useState, useContext} from "react";
import 
{
  IonContent,
  IonHeader, 
  IonButton, 
  IonRow, 
  IonCol, 
  IonTitle, 
  IonToolbar,
  IonPage,
  IonButtons,
  IonMenuButton,
  isPlatform,
  IonFab,
  IonFabButton,
  IonIcon,
} from '@ionic/react';
import { add } from "ionicons/icons";
import ModalCrearRuta from "../components/ModalCrearRuta";
import RutaItem from "../components/RutaItem";
import RutasContext from "../data/rutas-context";

const Rutas: React.FC = () => {
  const [estaCreando, setEstaCreando] = useState(false);

  const rutasCtx = useContext(RutasContext);

  const iniciarCrearRutaHandler = () =>{
    setEstaCreando(true);
  };

  const cancelarEditarRutaHandler = () => {
    setEstaCreando(false);
  };

  const aceptarCreacionRutaHandler = (nombre: string, fechaCrea: Date) => {
    rutasCtx.agregarRuta(nombre, fechaCrea);
    setEstaCreando(false);
  }

  return (
    <React.Fragment>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Rutas</IonTitle>
            {!isPlatform("android") && (
              <IonButtons slot="end">
                <IonButton onClick={iniciarCrearRutaHandler}>
                  <IonIcon slot="icon-only" icon={add} />
                </IonButton>
              </IonButtons>
            )}
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {rutasCtx.rutas.map((reg) => (
            <IonRow key={`registro_ruta_${reg.id}`}>
              <IonCol size-md="4" offsetMd="4">
                <RutaItem nombre={reg.nombre} distancia={reg.distancia}
                 fechaUltRecor={reg.fechaUltRecorr} id={reg.id}/>
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
        </IonContent>
      </IonPage>
      <ModalCrearRuta show={estaCreando} onCancel={cancelarEditarRutaHandler}
        onSave={aceptarCreacionRutaHandler}/>
    </React.Fragment>
  );
}

export default Rutas;
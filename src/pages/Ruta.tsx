import React, { useContext } from 'react';
import { useParams } from 'react-router-dom'

import 
{
    IonBackButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonLabel,
    IonList,
    IonPage,
    IonRow,
    IonText,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import RutasContext from '../data/rutas-context';

const Ruta: React.FC = () => {
    const idRuta = useParams<{id: string}>().id;
    const rutasCtx = useContext(RutasContext);
    const ruta = rutasCtx.rutas.find(r => r.id === parseInt(idRuta))
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/rutas" />
            </IonButtons>
            <IonTitle>{ruta?.nombre}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonGrid>
            <h2>{ruta?.distancia}</h2>
            <IonText>
              <IonRow>
                <IonCol>
                  <IonLabel>fecha creación: </IonLabel>
                  {ruta?.fechaCreacion.toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    weekday: "long",
                  })}
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonLabel>Fecha último recorrido: </IonLabel>
                  {ruta?.fechaUltRecorr.toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    weekday: "long",
                  })}
                </IonCol>
              </IonRow>
            </IonText>
            <h2>Fotografías</h2>
            <IonCard>
              <IonCardContent>
                {ruta?.fotografias?.length ? (
                  <IonList>
                    <IonRow>
                      {ruta.fotografias.map((foto) => (
                        <IonCol key={`img_${foto.id}`} size-sm="6">
                          <IonCard href={foto.src} button>
                            <img src={foto.src} alt={foto.nombre} />
                          </IonCard>
                        </IonCol>
                      ))}
                    </IonRow>
                  </IonList>
                ) : (
                  <h2>Aún no se han agregado fotografías...</h2>
                )}
              </IonCardContent>
            </IonCard>
          </IonGrid>
        </IonContent>
      </IonPage>
    );
}

export default Ruta;
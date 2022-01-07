import React from 'react'

import 
{ 
    IonCard, 
    IonCardHeader, 
    IonCardTitle, 
    IonItem, 
    IonNote,
    IonCardSubtitle,
    IonCardContent,
    IonButton 
} from "@ionic/react";

const RutaItem: React.FC<{nombre: string, distancia: string, fechaUltRecor: Date,
    id: number}> = props => {
 return (
    <IonCard>
    <IonCardHeader>
      <IonItem lines="full">
        <IonCardTitle>{props.nombre}</IonCardTitle>
        <IonNote slot="end">{props.distancia}</IonNote>
      </IonItem>
      <IonCardSubtitle>
        Último recorrido:{" "}
        {props.fechaUltRecor.toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
          weekday: "long",
        })}
        </IonCardSubtitle>
    </IonCardHeader>
    <IonCardContent>
      <div className="ion-text-right">
        <IonButton
          fill="clear"
          color="tertiary"
          routerLink={`/rutas/${props.id}`}
        >
          Ver ruta
        </IonButton>
      </div>
    </IonCardContent>
  </IonCard>
 )
}

export default RutaItem
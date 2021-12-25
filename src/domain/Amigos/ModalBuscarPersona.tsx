import React, {
  InputHTMLAttributes,
  useEffect,
  useReducer,
  useRef,
} from "react";

import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonList,
} from "@ionic/react";
import BKDataContext from "../../data/BKDataContext";

const estadoInicial = {
  buscando: false,
  personas: [],
  busqueda: "",
};

const buscarPersonaReductor = (
  estado: any,
  accion: {
    tipo: string;
    personas?: any[];
    busqueda?: string | undefined;
  }
) => {
  switch (accion.tipo) {
    case "REALIZAR_BUSQUEDA":
      return {
        ...estado,
        buscando: true,
      };
    case "MOSTRAR_RESULTADOS":
      return {
        ...estado,
        buscando: false,
        personas: accion.personas,
      };
    case "MODIFICAR_BUSQUEDA":
      return {
        ...estado,
        busqueda: accion.busqueda,
      };
  }
};

const ModalBuscarPersona: React.FC<{ show: boolean; onCancel: () => void }> = (
  props
) => {
  const [estado, dispatch] = useReducer(buscarPersonaReductor, estadoInicial);
  const inputRef = useRef<HTMLIonInputElement>(null);

  const onInputbusqueda = () => {
    // Modificamos el estado de la búsqueda, un efecto se encargará
    // de realizar la búsqueda
    dispatch({
      tipo: "MODIFICAR_BUSQUEDA",
      busqueda: inputRef!.current!.value as string,
    });
  };

  useEffect(() => {
    // Preparamos la búsqueda, esta se iniciará un segundo después de la
    // introducción del texto. Almacenamos el id del temporizador para
    // limpiarlo durante la función de limpieza. Lanzamos acción de
    // realizar búsqueda para mostrar loader al usuario
    dispatch({ tipo: "REALIZAR_BUSQUEDA" });
    const idTempo = setTimeout(async () => {
      // Una vez obtenidos los resultados, lanzamos acción para mostrar
      // los resultados al usuario.
      const personas = await BKDataContext.Usuarios(null, estado.busqueda);
      dispatch({ tipo: "MOSTRAR_RESULTADOS", personas });
    }, 1000);

    return () => {
      // Función de limpieza
      clearTimeout(idTempo);
    };
  }, [estado.busqueda]);

  return (
    <IonModal isOpen={props.show}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Agregar amigo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Búsqueda</IonLabel>
                <IonInput
                  ref={inputRef}
                  onInput={onInputbusqueda}
                  type="text"
                />
              </IonItem>
            </IonCol>
          </IonRow>
          {estado.buscando && (
            <IonRow>
              <IonCol>
                <IonItem>
                  <div>Buscando, por favor espere...</div>
                </IonItem>
              </IonCol>
            </IonRow>
          )}
          {estado.personas.length && (
            <IonList lines="full">
              {estado.personas.map((p: any) => (
                <IonItem key={p.IdUsuario}>
                  <IonLabel>
                    <h2>{p.NombreUsuario}</h2>
                    <h3>{`${p.Nombre} ${p.Apellidos}`}</h3>
                    <p>{p.KmRecorridos} km. recorridos</p>
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
          )}
          <IonRow>
            <IonCol>
              <IonButton onClick={props.onCancel}>Cancelar</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonModal>
  );
};

export default ModalBuscarPersona;

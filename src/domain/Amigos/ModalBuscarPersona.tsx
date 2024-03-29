import React, { useEffect, useReducer, useRef } from "react";

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
import Usuario from "../../components/Usuario";

const estadoInicial = {
  buscando: false,
  personas: [],
  busqueda: "",
  idAgregando: null,
};

const buscarPersonaReductor = (
  state: any,
  accion: {
    tipo: string;
    personas?: any[];
    busqueda?: string | undefined;
    idAgregando?: number;
  }
) => {
  switch (accion.tipo) {
    case "REALIZAR_BUSQUEDA":
      return {
        ...state,
        buscando: true,
        idAgregando: null,
      };
    case "MOSTRAR_RESULTADOS":
      return {
        ...state,
        buscando: false,
        personas: accion.personas,
      };
    case "MODIFICAR_BUSQUEDA":
      return {
        ...state,
        busqueda: accion.busqueda,
      };
    case "AGREGAR_AMIGO":
      return {
        ...state,
        idAgregando: accion.idAgregando,
      };
  }
};

const ModalBuscarPersona: React.FC<{
  show: boolean;
  idUsuario: number;
  onCancel: () => void;
}> = (props) => {
  const [state, dispatch] = useReducer(buscarPersonaReductor, estadoInicial);
  const inputRef = useRef<HTMLIonInputElement>(null);

  const onInputbusqueda = () => {
    // Modificamos el estado de la búsqueda, un efecto se encargará
    // de realizar la búsqueda
    dispatch({
      tipo: "MODIFICAR_BUSQUEDA",
      busqueda: inputRef!.current!.value as string,
    });
  };

  const realizarBusqueda = async () => {
    console.log("Realizando búsqueda");
    // Lanzamos acción de realizar búsqueda para mostrar loader al usuario
    dispatch({ tipo: "REALIZAR_BUSQUEDA" });
    const idUsuario = props.idUsuario;
    if (!idUsuario) {
      // Sin id de usuario válido, abortamos el proceso
      throw new Error("Id usuario no válido");
    }

    const personas = await BKDataContext.Usuarios(
      props.idUsuario,
      state.busqueda
    );

    // Una vez obtenidos los resultados, lanzamos acción para mostrar
    // los resultados al usuario.
    dispatch({ tipo: "MOSTRAR_RESULTADOS", personas });
  };

  useEffect(() => {
    // Preparamos la búsqueda, esta se iniciará un segundo después de la
    // introducción del texto. Almacenamos el id del temporizador para
    // limpiarlo durante la función de limpieza.
    const idTempo = setTimeout(realizarBusqueda, 1000);

    return () => {
      // Función de limpieza
      clearTimeout(idTempo);
    };

    // Al arreglo de dependencias agregamos el id del usuario almacenado
    // en las propiedades del componente, ya que typescript nos lo exije
    // como parte de la regla 'exhaustive-deps' (React hook has a missing
    // dependency).
  }, [state.busqueda, props.idUsuario]);

  useEffect(() => {
    // Realizamos una búsqueda en seguida de mostrar el modal
    if(props.show){
      realizarBusqueda();
    }
  }, [props.show]);

  const enAgregarAmigo = async (idAmigo: number) => {
    dispatch({ tipo: "AGREGAR_AMIGO", idAgregando: idAmigo });
    const idUsuario = props.idUsuario;

    // Agregamos amigo al servidor
    await BKDataContext.AgregarAmigo(idUsuario, idAmigo);

    // Realizamos búsqueda para actualizar la lista de usuarios
    // Todo. Realizar una búsqueda en este punto no parece la opción
    // más indicada... Seguir investigando.
    realizarBusqueda();
  };

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
          {state.buscando && (
            // Realizando proceso de búsqueda, mostramos mensaje
            // al usuario
            <IonRow>
              <IonCol>
                <IonLabel>
                  <p>Buscando, por favor espere...</p>
                </IonLabel>
              </IonCol>
            </IonRow>
          )}
          {state.personas.length !== 0 && (
            // Hay resultados. Mostramos lista al usuario
            <IonList lines="full">
              {state.personas.map((p: any) => (
                <Usuario key={p.idUsuario} usuario={p}>
                  {p.sonAmigos ? (
                    <IonButton disabled fill="outline" color="success">
                      Amigo
                    </IonButton>
                  ) : (
                    <IonButton
                      disabled={state.idAgregando === p.idUsuario}
                      fill="outline"
                      color="secondary"
                      onClick={() => enAgregarAmigo(p.idUsuario)}
                    >
                      Agregar
                    </IonButton>
                  )}
                </Usuario>
              ))}
            </IonList>
          )}
          {!state.personas.length && !state.buscando && (
            // No se está en proceso de búsqueda y sin embargo no hay
            // resultados. Mostramos mensaje al usuario
            <IonRow>
              <IonCol>
                <IonLabel>
                  <p>No se han encontrado resultados</p>
                </IonLabel>
              </IonCol>
            </IonRow>
          )}
          <IonRow>
            <IonCol>
              <IonButton
                fill="clear"
                color="secondary"
                onClick={props.onCancel}
              >
                Cerrar
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonModal>
  );
};

export default ModalBuscarPersona;

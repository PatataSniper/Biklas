import { IonLoading, IonToast } from "@ionic/react";
import React, { FunctionComponent, useEffect, useReducer } from "react";
import AppPage from "../../components/AppPage";
import Mapa from "../../components/Mapa";
import BKDataContext from "../../data/BKDataContext";

interface RodarProps {}

interface RodarState
{
  posInicialX: number | null,
  posInicialY: number | null,
  posFinalX: number | null,
  posFinalY: number | null,
  obtenerRuta: boolean,
  shapeRuta: Array<object>,
  procesando: boolean,
  msjError: string | null
}

const estadoInicial: RodarState = {
  posInicialX: null,
  posInicialY: null,
  posFinalX: null,
  posFinalY: null,
  obtenerRuta: false,
  shapeRuta: [],
  procesando: false,
  msjError: null
}

const rodarReductor = (state: RodarState, action: { type: string, payload?: any }) : RodarState => {
	switch (action.type) {
    case 'GUARDAR_POS_INICIAL':
      return {
        ...state,
        posInicialX: action.payload.posInicialX,
        posInicialY: action.payload.posInicialY
      }
    case 'GUARDAR_POS_FINAL':
      return {
        ...state,
        posFinalX: action.payload.posFinalX,
        posFinalY: action.payload.posFinalY,
        obtenerRuta: true
      }
    case 'INICIAR_OBTENCION_RUTA':
      return {
        ...state,
        obtenerRuta: false,
        shapeRuta: [],
        procesando: true
      }
    case 'FINALIZAR_OBTENCION_RUTA':
      return {
			...state,
			posInicialX: null,
			posInicialY: null,
			posFinalX: null,
			posFinalY: null,
			shapeRuta: action.payload.shapeRuta,
			procesando: false,
			msjError: action.payload.msjError,
		}
      case 'FINALIZAR_DESPLIEGUE_ERROR':
      return {
			...state,
			msjError: null,
		};
    default:
      // Sin acción válida, devolvemos el estado original sin modificación
      console.error(`Acción '${action.type}' no configurada en reductor`);
      return state;
	}
};

const Rodar: FunctionComponent<RodarProps> = () => {
  const [state, dispatch] = useReducer(rodarReductor, estadoInicial);
  
  // Preparamos un efecto secundario para iniciar la obtención de la ruta
  useEffect(() =>{
    if(state.obtenerRuta){
      // Obtenemos la ruta óptima del servidor
      obtenerRutaOptima();
    }
  }, [state.obtenerRuta]);

  const enClick = (mapProps: any, map: any, clickEvent: any) => {
    const lat = clickEvent.latLng.lat();
    const lng = clickEvent.latLng.lng();

    console.log(`Lat: ${lat}`);
    console.log(`Lng: ${lng}`);

    if(!state.posInicialX){
      // Capturamos la posición inicial seleccionada por el usuario
      dispatch({
        type: "GUARDAR_POS_INICIAL",
        payload: {
          posInicialX: lat,
          posInicialY: lng,
        },
		  });
    }
    else{
      // Capturamos la posición final seleccionada por el usuario
      dispatch({
        type: "GUARDAR_POS_FINAL",
        payload: {
          posFinalX: lat,
          posFinalY: lng,
        },
		  });
    }
  }

  const obtenerRutaOptima = () =>{
		// Iniciamos la obtención de la ruta óptima
		dispatch({
			type: "INICIAR_OBTENCION_RUTA",
		});

    // Preparamos variables de obtención de información y de obtención
    // de errores
    let rOptima: any[] = [];
    let msjError: string | null = null;
		BKDataContext.ObtenerRutaOptima(
			state.posInicialX!,
			state.posInicialY!,
			state.posFinalX!,
			state.posFinalY!
		).then((result: any) => {
      // Éxito en la obtención de la ruta óptima
      rOptima = result.shape;
    }).catch((error) => {
      // Error en la obtención de la ruta óptima
      console.error(error);
      msjError = error;
    }).finally(() => {
      // Finalizamos la obtención de la ruta óptima
      dispatch({
        type: "FINALIZAR_OBTENCION_RUTA",
        payload: {
          shapeRuta: rOptima,
          msjError
        },
      });
    });
  }

  return (
    <AppPage>
        <Mapa fnClick={enClick} path={state.shapeRuta}/>
        <IonLoading
				isOpen={state.procesando}
				message={"Procesando..."}
			  />
        <IonToast
				isOpen={state.msjError !== null}
				onDidDismiss={() => dispatch({ type: "FINALIZAR_DESPLIEGUE_ERROR" })}
				message={state.msjError || ""}
				position="bottom"
				duration={5000}
				color="danger"
			  />
    </AppPage>
  );
};

export default Rodar;

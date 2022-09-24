import React, { FunctionComponent, useEffect, useReducer, useState } from "react";
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
  shapeRuta: Array<object>
}

const estadoInicial: RodarState = {
  posInicialX: null,
  posInicialY: null,
  posFinalX: null,
  posFinalY: null,
  obtenerRuta: false,
  shapeRuta: []
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
        shapeRuta: []
      }
    case 'FINALIZAR_OBTENCION_RUTA':
      return {
        ...state,
        posInicialX: null,
        posInicialY: null,
        posFinalX: null,
        posFinalY: null,
        shapeRuta: action.payload.shapeRuta
      }
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

  const obtenerRutaOptima = async () =>{
		// Iniciamos la obtención de la ruta óptima
		dispatch({
			type: "INICIAR_OBTENCION_RUTA",
		});

		const result = await BKDataContext.ObtenerRutaOptima(
			state.posInicialX!,
			state.posInicialY!,
			state.posFinalX!,
			state.posFinalY!
		);

		dispatch({
			type: "FINALIZAR_OBTENCION_RUTA",
			payload: {
				shapeRuta: result,
			},
		});
  }

  return (
    <AppPage>
        <Mapa fnClick={enClick} path={state.shapeRuta}/>
    </AppPage>
  );
};

export default Rodar;

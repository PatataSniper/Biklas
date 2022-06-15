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
  coordsRuta: Array<object>
}

const estadoInicial: RodarState = {
  posInicialX: null,
  posInicialY: null,
  posFinalX: null,
  posFinalY: null,
  obtenerRuta: false,
  coordsRuta: []
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
        coordsRuta: []
      }
    case 'FINALIZAR_OBTENCION_RUTA':
      return {
        ...state,
        posInicialX: null,
        posInicialY: null,
        posFinalX: null,
        posFinalY: null,
        coordsRuta: action.payload.coordsRuta
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
    let msj = `Almacenamos lat: ${lat} y lng: ${lng} como posición `;

    if(!state.posInicialX){
      // Capturamos la posición inicial seleccionada por el usuario
      dispatch({
        type: "GUARDAR_POS_INICIAL",
        payload: {
          posInicialX: lng,
          posInicialY: lat,
        },
		  });

      msj += "inicial";
    }
    else{
      // Capturamos la posición final seleccionada por el usuario
      dispatch({
        type: "GUARDAR_POS_FINAL",
        payload: {
          posFinalX: lng,
          posFinalY: lat,
        },
		  });

      msj += "final";
    }

    console.log(msj);
  }

  const obtenerRutaOptima = () =>{
    // Iniciamos la obtención de la ruta óptima
    dispatch({
      type: "INICIAR_OBTENCION_RUTA",
    });

    BKDataContext.ObtenerRutaOptima(state.posInicialX!,
      state.posInicialY!,
      state.posFinalX!,
      state.posFinalY!).then(() => {
        // Finalizamos la obtención de la ruta óptima
        console.log("Finalizó la obtención de la ruta");
        dispatch({
          type: "FINALIZAR_OBTENCION_RUTA",
          payload: {
            coordsRuta: [1,2,3]
          },
        });
      });
  }

  return (
    <AppPage>
        <Mapa fnClick={enClick}/>
    </AppPage>
  );
};

export default Rodar;

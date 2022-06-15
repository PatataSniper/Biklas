import React from "react";
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { GOOGLE_DEV_API_KEY } from '../config/credentials-config';

// Nota: Decidimos utilizar un archivo .js en lugar de un .ts, esto debido a 
// que el compilador de typescript parece no reconocer algunas propiedades de
// la clase Map, como por ejemplo la propiedad 'zoom'
const Mapa = (props) => {
    return (
        <Map
          google={props.google}
          initialCenter={ { lat: 20.700195, lng: -103.330416 } }
          scrollWheel={false}
          zoom={15}
          mapTypeControl={false}
          fullscreenControl={false}
          zoomControl={false}
          streetViewControl={false}
          onClick={props.fnClick}
          >
        </Map>
    );
}
 
export default GoogleApiWrapper({
  apiKey: GOOGLE_DEV_API_KEY
})(Mapa);
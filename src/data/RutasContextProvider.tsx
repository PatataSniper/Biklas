import React, {useState} from 'react';

import RutasContext, {Ruta} from './rutas-context';

var nuevoId = 1;

const RutasContextProvider: React.FC<{children: {}}> = (props) => {

  const [rutas, setRutas] = useState<Ruta[]>([
    {
      id: nuevoId++,
      nombre: 'Ruta al trabajo',
      distancia: '7.6km',
      fechaCreacion: new Date(2021, 1, 26),
      fechaUltRecorr: new Date(2021, 2, 12),
      fotografias: []
    }
  ]);

  const agregarRuta = (nombre: string, fechaCreacion: Date) => {
    const nuevaRuta: Ruta = {
      id: nuevoId++,
      nombre,
      distancia: "0 km",
      fechaCreacion,
      fechaUltRecorr: new Date(),
      fotografias: [],
    };

    setRutas((rutas) => {
      return rutas.concat(nuevaRuta);
    });
  };

  const editarRuta = () => {};

  const eliminarRuta = () => {};

  const agregarFoto = () => {};

  const editarFoto = () => {};

  const eliminarFoto = () => {};

  return (
    <RutasContext.Provider
      value={{
        rutas,
        agregarRuta,
        editarRuta,
        eliminarRuta,
        agregarFoto,
        editarFoto,
        eliminarFoto,
      }}
    >
      {props.children}
    </RutasContext.Provider>
  );
}

export default RutasContextProvider
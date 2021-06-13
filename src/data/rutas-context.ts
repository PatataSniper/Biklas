import React from 'react'

export interface Ruta {
    id: number,
    nombre: string,
    distancia: string,
    fechaCreacion: Date,
    fechaUltRecorr: Date,
    fotografias: Fotografia[]
}

interface Fotografia {
    id: number,
    nombre: string,
    src: string
}

interface Context {
  rutas: Ruta[];
  agregarRuta: (nombre: string, fechaCreacion: Date) => void;
  editarRuta: () => void;
  eliminarRuta: () => void;
  agregarFoto: () => void;
  editarFoto: () => void;
  eliminarFoto: () => void;
}

const RutasContext = React.createContext<Context>({
  rutas: [],
  agregarRuta: () => {},
  editarRuta: () => {},
  eliminarRuta: () => {},
  agregarFoto: () => {},
  editarFoto: () => {},
  eliminarFoto: () => {},
});

export default RutasContext
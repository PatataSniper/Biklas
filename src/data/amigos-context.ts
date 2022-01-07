import React from "react"

// The next interface is very similar to the one 
// used for modeling users
/**
 * Interface for modeling a friend object
 */
 export interface amigo {
  id: number,
  nombre: string,
  apellidos: string,
  nombreUsuario: string,
  fechaNacimiento: Date,
  kmRecorridos: number,
  amigosDesde: Date
}

interface Context{
    amigos: amigo[];
    enviarSolicitudAmigo: (id: number) => void;
    enviarMensaje: () => void;
    eliminarAmigo: () => void;
    estaCargando: boolean;
}

export const AmigosContext = React.createContext<Context>({
  amigos: [],
  enviarSolicitudAmigo: (id: number) => {},
  enviarMensaje: () => {},
  eliminarAmigo: () => {},
  estaCargando: false
});
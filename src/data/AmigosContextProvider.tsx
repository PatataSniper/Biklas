import React from "react"

import { AmigosContext } from "../data/amigos-context"

const AmigosContextProvider: React.FC<{children:  {}}> = (props) => {
    var nuevoId = 1;
    const amigos = [
      
      {
        id: 0,
        nombre: "Prueba",
        apellidos: "Prueba",
        kmRecorridos: 0,
        fechaNacimiento: new Date(1997, 7, 4),
        amigosDesde: new Date(1997, 7,4)
      }
    ];

    const enviarSolicitudAmigo = () => {};
    const enviarMensaje = () => {};
    const eliminarAmigo = () => {};

    return (
      <AmigosContext.Provider
        value={{
          amigos,
          enviarSolicitudAmigo,
          enviarMensaje,
          eliminarAmigo,
          estaCargando: false
        }}
      >
        {props.children}
      </AmigosContext.Provider>
    );
}

export default AmigosContextProvider;
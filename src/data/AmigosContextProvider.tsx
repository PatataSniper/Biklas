import React from "react"

import { amigo, AmigosContext } from "../data/amigos-context"

// Todo: ¿En donde se utiliza 'AmigosContextProvider'?
const AmigosContextProvider: React.FC<{children:  {}}> = (props) => {
    const amigos: amigo[] = [];

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
import React from "react"

import AmigosContext from "../data/amigos-context"
// Prueba 2
const AmigosContextProvider: React.FC<{children:  {}}> = (props) => {
    var nuevoId = 1;
    const amigos = [
      {
        id: nuevoId++,
        nombre: "Ricardo",
        apellidos: "Orozco Aceves",
        contraseña: "123",
        kmRecorridos: 89.4,
        fechaNacimiento: new Date(1997, 7, 4),
      },
      {
        id: nuevoId++,
        nombre: "Carlos Salvador",
        apellidos: "Arias Sánchez",
        contraseña: "321",
        kmRecorridos: 1640,
        fechaNacimiento: new Date(1996, 4, 16),
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
        }}
      >
        {props.children}
      </AmigosContext.Provider>
    );
}

export default AmigosContextProvider;
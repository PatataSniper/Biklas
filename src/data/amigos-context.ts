import React from "react"
import { usuario } from "../data/usuarios-context";

interface Context{
    amigos: usuario[];
    enviarSolicitudAmigo: (id: number) => void;
    enviarMensaje: () => void;
    eliminarAmigo: () => void;
}

const UsuariosContext = React.createContext<Context>({
  amigos: [],
  enviarSolicitudAmigo: (id: number) => {},
  enviarMensaje: () => {},
  eliminarAmigo: () => {},
});

export default UsuariosContext;
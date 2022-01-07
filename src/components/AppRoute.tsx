import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import InicioSesion from "../domain/InicioSesion/InicioSesion";

export const AppRoute: React.FC<{
  path: string;
  isPrivate: boolean;
  component: any;
  props?: {};
}> = (props) => {
  const authContex = useContext(AuthContext) as any;

  /**
   * Nos indicará si el usuario tiene acceso a la ruta actual, ya sea
   * porque la ruta es pública o existe un usuario firmado válido
   * @returns {boolean} ¿El usario tiene acceso a la ruta actual?
   */
  const tieneAcceso = () => {
    return !props.isPrivate || Boolean(authContex.authState.user?.IdUsuario);
  };

  return (
    <Route
      path={props.path}
      render={() =>
        tieneAcceso() ? <props.component {...props.props} /> : <InicioSesion />
      }
    />
  );
};

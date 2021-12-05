import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthStateContext } from "../context";
import InicioSesion from "../pages/InicioSesion";

export const AppRoute: React.FC<{
  path: string;
  isPrivate: boolean;
  component: any;
  props?: {};
}> = (props) => {
  const userContex = useContext(AuthStateContext) as any;
  console.log(userContex);

  /**
   * Nos indicará si el usuario tiene acceso a la ruta actual, ya sea
   * porque la ruta es pública o existe un usuario firmado válido
   * @returns {boolean} ¿El usario tiene acceso a la ruta actual?
   */
  const tieneAcceso = () => {
    return !props.isPrivate || Boolean(userContex.user?.IdUsuario);
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

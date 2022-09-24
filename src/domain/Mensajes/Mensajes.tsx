import React, { FunctionComponent } from "react";
import AppPage from "../../components/AppPage";

interface MensajesProps {}

const Mensajes: FunctionComponent<MensajesProps> = () => {
  return (
    <AppPage titulo="Mensajes">
      <h2>Mostramos los mensajes</h2>
    </AppPage>
  );
};

export default Mensajes;

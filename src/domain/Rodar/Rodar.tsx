import React, { FunctionComponent } from "react";
import AppPage from "../../components/AppPage";
import Mapa from "../../components/Mapa";

interface RodarProps {}

const Rodar: FunctionComponent<RodarProps> = () => {
  return (
    <AppPage>
        <Mapa/>
    </AppPage>
  );
};

export default Rodar;

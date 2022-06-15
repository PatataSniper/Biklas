import React, { useState, useContext, useEffect } from "react";
import RutaItem from "./RutaItem";
import AppPage from "../../components/AppPage";
import { AuthContext } from "../../context/authContext";
import { Ruta } from "../../data/rutas-context";
import BKDataContext from "../../data/BKDataContext";
import estilos from "./Rutas.module.scss";

// Preparamos el estado inicial del componente. Para este componente (que
// en principio no será muy complejo) utilizamos el gancho 'useState'
const estadoInicial = {
  rutas: [],
  creando: false,
};

const Rutas: React.FC = () => {
  const [state, setState] = useState(estadoInicial);

  // Obtenemos estado de autorización desde el provider context más cercano
  let { authState } = useContext(AuthContext) as any;

  const obtenerRutas = async () => {
    try {
      const idUsuario = authState.user.IdUsuario;
      if (!idUsuario) {
        // Id de usuario no válido, abortamos el proceso
        throw new Error("Id usuario no válido");
      }

      // Esperamos la respuesta del contexto de datos y actualizamos el contexto local
      setState({
        creando: state.creando,
        rutas: await BKDataContext.Rutas(idUsuario),
      });
    } catch (ex) {
      console.error(ex);
    }
  };

  // Utilizamos un efecto para cargar las rutas relacionadas. No pasamos ninguna
  // dependencia para imitar el comportamiento de la función componentDidMount
  useEffect(() => {
    // Obtenemos las rutas relacionadas al usuario firmado
    obtenerRutas();
  }, []);

  return (
    <React.Fragment>
      <AppPage titulo="Rutas" esVistaSecundaria>
        <div className={estilos.contenedorRutas}>
          {state.rutas.map((reg: Ruta) => (
            <div key={reg.id} className={estilos.contenedorRuta}>
              <RutaItem
                nombre={reg.nombre}
                distancia={reg.distancia}
                fechaCreacion={reg.fechaCreacion}
                id={reg.id}
                esPropia={false} // Este módulo solamente mostrará rutas propias del usuario
                coordenadas={reg.coordenadas}
              />
            </div>
          ))}
        </div>
      </AppPage>
    </React.Fragment>
  );
};

export default Rutas;

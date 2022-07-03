import { AMIGOS_CONTROLLER, RUTAS_CONTROLLER, USUARIOS_CONTROLLER } from "../bk-constantes";
import { llamadaAjax } from "../bk-utils";

class BKDataContext {
  /**
   * Obtiene la lista de usuarios dados de alta. Se puede especificar el id
   * del usuario que realiza la búsqueda, dicho usuario se excluirá de la
   * lista resultante
   * @param {(number|null)} idUsuario El id del usuario que realiza la búsqueda
   * @param {string} textoBusqueda El texto de búsqueda de usuarios
   * @param {boolean} actualizar Indica si se deberán actualizar los datos
   * desde el servidor remoto o no. True por defecto
   * @returns {Array} Usuarios obtenidos del almacenamiento (remoto o local)
   */
  static async Usuarios(
    idUsuario = null,
    textoBusqueda = null,
    actualizar = true
  ) {
    let usuarios = [];
    if (actualizar) {
      // Se especifica la actualización, intentaremos obtener los datos
      // del servidor remoto
      const params = {
        idUsuario,
        textoBusqueda,
      };

      await llamadaAjax(USUARIOS_CONTROLLER, null, params)
        .then((result) => {
          // Asignamos los usuarios devueltos por el servidor
          usuarios = result;
        })
        .catch((err) => console.log(err));
    }

    if (!usuarios.length) {
      // Datos no obtenidos desde el servidor, los obtenemos del
      // almacenamiento local
      console.log("Obteniendo datos del almacenamiento local");
    }

    return usuarios;
  }

  /**
   * Obtiene la lista de amigos relacionados a un usuario especificado
   * @param {number} idUsuario El id del usuario especificado
   * @param {boolean} actualizar Indica si se deberán actualizar los datos
   * desde el servidor remoto o no. True por defecto
   */
  static async Amigos(idUsuario, actualizar = true) {
    let amigos = null;
    if (actualizar) {
      // Se especifica la actualización, intentaremos obtener los datos
      // del servidor remoto
      let params = {
        idUsuario,
      };

      await llamadaAjax(AMIGOS_CONTROLLER, "ObtenerAmigosRelacionados", params)
        .then((result) => {
          // Asignamos los usuarios devueltos por el servidor
          amigos = result;
        })
        .catch((err) => console.log(err));
    }

    if (!amigos) {
      // Datos no obtenidos desde el servidor, los obtenemos del
      // almacenamiento local
      console.log("Obteniendo datos del almacenamiento local");
    }

    return amigos;
  }

  static async AgregarAmigo(idUsuario, idAmigo) {
    // Preparamos los parámetros de la función de agregación. Enviamos el
    // objeto de relación en un string codificado con formato JSON. Para esto
    // no utilizamos parámetros en URL, utilizamos la propiedad 'body' de los
    // parámetros de inicialización de la función 'fetch'
    const relacion = {
      IdUsuario: idUsuario,
      IdAmigo: idAmigo,
    };

    // Configuramos opciones de inicialización de la función 'fetch'
    let initOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(relacion),
    };

    // Todo. Debemos configurar la llamada como POST, pendiente.
    await llamadaAjax(AMIGOS_CONTROLLER, "AgregarAmigo", null, initOptions)
      .then(() => {
        // Éxito en la agregación del amigo
        console.log("Se agregó al amigo");
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }

  static async EliminarAmigo(idUsuario, idAmigo) {
    // Preparamos los parámetros de la función de eliminación. Enviamos el
    // objeto de relación en un string codificado con formato JSON. Para esto
    // no utilizamos parámetros en URL, utilizamos la propiedad 'body' de los
    // parámetros de inicialización de la función 'fetch'
    const relacion = {
      IdUsuario: idUsuario,
      IdAmigo: idAmigo,
    };

    // Configuramos opciones de inicialización de la función 'fetch'
    let initOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(relacion),
    };

    await llamadaAjax(AMIGOS_CONTROLLER, "EliminarAmigo", null, initOptions)
      .then((result) => {
        // Éxito en la eliminación de la relación de amistad
      })
      .catch((err) => console.log(err));
  }

  /**
   * Obtiene la lista de rutas relacionadas a un usuario especificado
   * @param {number} idUsuario El id del usuario especificado
   * @param {boolean} actualizar Indica si se deberán actualizar los datos
   * desde el servidor remoto o no. True por defecto
   */
   static async Rutas(idUsuario, actualizar = true) {
    let rutas = null;
    if (actualizar) {
      // Se especifica la actualización, intentaremos obtener los datos
      // del servidor remoto
      let params = {
        idUsuario,
      };

      await llamadaAjax(RUTAS_CONTROLLER, "ObtenerRutasRelacionadas", params)
        .then((result) => {
          // Asignamos las rutas devueltas por el servidor
          rutas = result;
        })
        .catch((err) => console.log(err));
    }

    if (!rutas) {
      // Datos no obtenidos desde el servidor, los obtenemos del
      // almacenamiento local
      console.log("Obteniendo datos del almacenamiento local");
    }

    return rutas ?? [];
  }

  /**
   * Obtiene la ruta óptima entre dos puntos. Se calculará y se obtendrá
   * del servidor remoto
   * @param {number} xIni Coordenada inicial (x)
   * @param {number} yIni Coordenada inicial (y)
   * @param {number} xFin Coordenada final (x)
   * @param {number} yFin Coordenada final (y)
   */
  static async ObtenerRutaOptima(xIni, yIni, xFin, yFin) {
    const params = {
      xIni,
      yIni,
      xFin,
      yFin
    }

    let rutaOptima = null;

    await llamadaAjax(RUTAS_CONTROLLER, "ObtenerRutaOptima", params)
      .then((result) => {
        console.log("Resultado obtenido:");
        console.log(result);
        rutaOptima = result.shape;
      })
      .catch((error) => {
        console.log(error);
      })

    return rutaOptima;
  }
}

export default BKDataContext;

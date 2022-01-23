import { AMIGOS_CONTROLLER, USUARIOS_CONTROLLER } from "../bk-constantes";
import {llamadaAjax} from "../bk-utils";

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
  static async Usuarios(idUsuario = null, textoBusqueda = null, actualizar = true) {
    let usuarios = [];
    if (actualizar) {
      // Se especifica la actualización, intentaremos obtener los datos
      // del servidor remoto
      const params = {
        idUsuario,
        textoBusqueda
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
   * Obtener la lista de amigos relacionados a un usuario especificado
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

  static async AgregarAmigo(idUsuario, idAmigo){
    // Preparamos los parámetros de la función de agregación
    let params = {
      idUsuario,
      idAmigoAgregar: idAmigo
    }

    // Todo. Debemos configurar la llamada como POST, pendiente.
    await llamadaAjax(AMIGOS_CONTROLLER, "AgregarAmigo", params)
    .then(() => {
      // Éxito en la agregación del amigo
      console.log("Se agregó al amigo");
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false
    });
  }

  static async EliminarAmigo(idUsuario, idAmigo){
    // Preparamos los parámetros de la función de eliminación
    let params = {
      idUsuario,
      idAmigo
    }

    // Debemos configurar la llamada como POST, pendiente.
    await llamadaAjax(AMIGOS_CONTROLLER, "EliminarAmigo", params)
    .then((result) => {
      // Éxito en la eliminación de la relación de amistad
    })
    .catch((err) => console.log(err));
  }
}

export default BKDataContext;

// Biklas (2021)
// Utilidades en javascript
import { ClientConfig } from "./config/client-config";

/**
 * Realiza una llamada AJAX a la ruta especificada. Utilice las opciones de inicio para configurar los
 * parametros de la función 'fetch' interna. Utilice el parámetro 'params' para configurar los parametros
 * de la función objetivo del servidor
 * @param {string} controlador Controlador involucrado en la petición
 * @param {string} funcion Función involucrada en la petición
 * @param {object} params Parametros involucrados en la petición (se agregarán como parámetros a la URL).
 * La llave de cada entrada deberá ser el nombre del parámetro, el valor de cada entrada deberá ser el
 * valor del parámetro
 * @param {object} initOptions Objeto de configuración de inicio de la función 'fetch' interna.
 * https://javascript.info/fetch
 * @returns Promesa de resolución de llamada
 */
export function llamadaAjax(controlador, funcion, params, initOptions = null) {
  // Construimos un objeto 'URL' para usar como parámetro
  let direccion = controlador;

  if(funcion){
    // Se especificó una función, se agrega a la dirección. 
    // Nota: Una dirección puede NO tener función cuando se trata de la función
    // por defecto de un controlador, por ejemplo 'api/usuarios'
    direccion += `/${funcion}`;
  }

  return llamadaAjaxAURL(
    new URL(direccion, ClientConfig.URL_API),
    params,
    initOptions
  );
}

/**
 * Realiza una llamada AJAX a la URL especificada. Utilice las opciones de inicio para configurar los
 * parametros de la función 'fetch' interna. Utilice el parámetro 'params' para configurar los parametros
 * de la función objetivo del servidor
 * @param {URL} url Objeto URL involucrado en la petición
 * @param {object} params Parametros involucrados en la petición (se agregarán como parámetros a la URL).
 * La llave de cada entrada deberá ser el nombre del parámetro, el valor de cada entrada deberá ser el
 * valor del parámetro. Evitar mandar información sensible mediante este método.
 * @param {object} initOptions Objeto de configuración de inicio de la función 'fetch' interna.
 * https://javascript.info/fetch
 * @returns Promesa de resolución de llamada
 */
export function llamadaAjaxAURL(url, params, initOptions) {
  return new Promise((resolve, reject) => {
    if (!url) reject("Parametro 'url' es obligatorio");

    initOptions = __prepararInitOptions(initOptions);
    url = __asignarParamsAURL(url, params);

    fetch(url, initOptions)
      .then((respuesta) => {
        if (!respuesta.ok) {
          // Error durante enlace con el servidor, este error no le debería concernir al usuario
          // lo mostramos en consola y rechazamos la promesa sin información de error
          console.error(`Error HTTP: ${respuesta.status}`);
          reject();
        }

        // Llamada sin errores de solicitud, solicitamos el contenido de la respuesta
        __obtenerCuerpoRespuesta(
          respuesta,
          initOptions["responseBodyType"],
          initOptions["errProperty"]
        )
          .then((contenido) => {
            // No hubo errores aparentes, éxito en la llamada
            resolve(contenido);
          })
          .catch((error) => {
            // Error durante proceso en el servidor, es probable que este
            // error le concierna al usuario, rechazamos la promesa con información
            // de error
            reject(error);
          });
      })
      .catch((err) => {
        // Error durante enlace con el servidor, este error no le debería concernir al usuario
        // lo mostramos en consola y rechazamos la promesa sin información de error
        console.error(err);
        reject();
      });
  });
}

function __prepararInitOptions(initOptions) {
  if (!initOptions) {
    // Inicializamos objeto de opciones
    initOptions = {};
  }

  //// La función Fetch() ya configura estos parámetros por defecto... Descomentar y configurar
  //// si se desea cambiar dicho comportamiento por defecto
  // initOptions["method"] = initOptions["method"] ?? undefined;
  // initOptions["headers"] = initOptions["headers"] ?? undefined;
  // initOptions["body"] = initOptions["body"] ?? undefined;
  // initOptions["referrer"] = initOptions["referrer"] ?? undefined;
  // initOptions["referrerPolicy"] = initOptions["referrerPolicy"] ?? undefined;
  // initOptions["mode"] = initOptions["mode"] ?? undefined;
  // initOptions["credentials"] = initOptions["credentials"] ?? undefined;
  // initOptions["cache"] = initOptions["cache"] ?? undefined;
  // initOptions["redirect"] = initOptions["redirect"] ?? undefined;
  // initOptions["integrity"] = initOptions["integrity"] ?? undefined;
  // initOptions["keepalive"] = initOptions["keepalive"] ?? undefined;
  // initOptions["signal"] = initOptions["signal"] ?? undefined;
  // initOptions["mode"] = initOptions["mode"] ?? undefined;

  // Opciones agregadas
  initOptions["errProperty"] = initOptions["errProperty"] ?? "err";
  initOptions["responseBodyType"] = initOptions["responseBodyType"] ?? "json";

  return initOptions;
}

/**
 * Agregamos parámetro a URL en caso de existir
 * @param {URL} url URL de solicitud
 * @param {object} params La llave de cada entrada deberá ser el nombre del
 * parámetro, el valor de cada entrada deberá ser el valor del parámetro
 */
function __asignarParamsAURL(url, params) {
  if (params) {
    for (const paramName of Object.keys(params)) {
      // Agregamos el parámetro a la URL
      url.searchParams.append(paramName, params[paramName]);
    }
  }

  return url;
}

function __obtenerCuerpoRespuesta(respuesta, responseBodyType, errProperty) {
  return new Promise((resolve, reject) => {
    try {
      switch (responseBodyType) {
        case "json":
          // Prometemos la obtención del cuerpo de la respuesta como objeto JSON
          respuesta.json().then((contenido) => {
            if (contenido[errProperty]) {
              // Error ocurrido y manejado en el servidor
              reject(contenido[errProperty]);
            }

            // Obtuvimos el contenido, éxito en la promesa
            resolve(contenido);
          });
          break;
        case "text":
          // Prometemos la obtención del cuerpo de la respuesta como texto
          respuesta.text().then((contenido) => {
            resolve(contenido);
          });
          break;
        case "formdata":
          // Prometemos la obtención del cuerpo de la respuesta como objeto FormData
          respuesta.formData().then((contenido) => {
            resolve(contenido);
          });
          break;
        case "blob":
          // Prometemos la obtención del cuerpo de la respuesta como Blob
          respuesta.blob().then((contenido) => {
            resolve(contenido);
          });
          break;
        case "arraybuffer":
          // Prometemos la obtención del cuerpo de la respuesta como ArrayBuffer
          respuesta.arrayBuffer().then((contenido) => {
            resolve(contenido);
          });
          break;
        default:
          throw new Error(`Tipo de cuerpo de respuesta '${responseBodyType}' no configurado. 
                        Configurelo como tipo de cuerpo respuesta válido`);
      }
    } catch (err) {
      reject(err);
    }
  });
}

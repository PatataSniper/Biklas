// Biklas (2021)

import { USUARIOS_CONTROLLER } from "../../bk-constantes";
import { llamadaAjax } from "../../bk-utils";

// Estructura obtenida de:
// https://soshace.com/react-user-login-authentication-using-usecontext-and-usereducer/
// De la misma manera que con redux, todas las funciones asíncronas que
// cambian/modifican un estado son llamadas acciones

export function loginUser(dispatch: any, loginPayload: any) {
	// Devolvemos una promesa, observese que la función 'llamadaAjax' ya devuelve
	// una promesa la cual manejamos. Sin embargo es necesario devolver una segunda
	// promesa para aislar el manejo de errores exclusivos del proceso de inicio
	// de sesión. Ya en el manejo de la segunda promesa podemos desencadenar
	// eventos de modificación de interfaz de usuario.
	return new Promise((resolve, reject) => {
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
		};

		try {
			dispatch({ type: "REQUEST_LOGIN" });

			// Al tratarse de información sensible (credenciales del usuario), no
			// agregamos parámetros a URL
			llamadaAjax(
				USUARIOS_CONTROLLER,
				"IniciarSesion",
				loginPayload,
				requestOptions
			)
				.then((data) => {
					// Usuario validado y autorizado, modificamos el contexto de
					// inicio de sesión con una acción de éxito en inicio de sesión
					dispatch({ type: "LOGIN_SUCCESS", payload: data });
					localStorage.setItem("currentUser", JSON.stringify(data));
					resolve(data);
				})
				.catch((error) => {
					// Error de servidor
					// El error ya se imprimió en consola, modificamos el estado
					// con una acción de fallo en inicio de sesión
					dispatch({ type: "LOGIN_ERROR", error });
					reject(error);
				});
		} catch (error) {
			// Error en cliente
			// Imprimimos el error en consola, modificamos el estado
			// con una acción de fallo en inicio de sesión
			console.log(error);
			dispatch({ type: "LOGIN_ERROR", error });
			reject(error);
		}
	});
}

export function createUser(dispatch: any, fnPayload: any) {
	return new Promise((resolve, reject) => {
		const requestOptions = {
			method: "POST",
			headers: { 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(fnPayload.nuevoUsuario)
		};

		try {
			// La funcionalidad requerida al inicio del proceso de creación de
			// usuario corresponde a la requerida al inicio del proceso de login,
			// es por esto que reutilizamos la acción REQUEST_LOGIN
			dispatch({ type: "REQUEST_LOGIN" });

			// Al tratarse de información sensible (datos del usuario), no agregamos
			// parámetros a URL
			llamadaAjax(
				USUARIOS_CONTROLLER,
				"",
				fnPayload,
				requestOptions
			)
				.then((data) => {
					// Usuario creado y autorizado, modificamos el contexto de
					// inicio de sesión con una acción de éxito en inicio de sesión
					dispatch({ type: "LOGIN_SUCCESS", payload: data });
					localStorage.setItem("currentUser", JSON.stringify(data));
					resolve(data);
				})
				.catch((error) => {
					// Error de servidor
					// El error ya se imprimió en consola, modificamos el estado
					// con una acción de fallo en inicio de sesión
					dispatch({ type: "LOGIN_ERROR", error });
					reject(error);
				});
		} catch (error) {
			// Error en cliente
			// Imprimimos el error en consola, modificamos el estado
			// con una acción de fallo en inicio de sesión
			console.log(error);
			dispatch({ type: "LOGIN_ERROR", error });
			reject(error);
		}
	});
}

export async function logout(dispatch: any) {
	dispatch({ type: "LOGOUT" });
	localStorage.removeItem("currentUser");
	localStorage.removeItem("token");
}

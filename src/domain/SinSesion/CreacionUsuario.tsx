import {
	IonButton,
	IonCol,
	IonGrid,
	IonInput,
	IonItem,
	IonLabel,
	IonRow,
} from "@ionic/react";
import React, { useRef } from "react";
import { useHistory } from "react-router";
import { RUTA_PAGINA_PRINCIPAL } from "../../bk-constantes";
import AppPage from "../../components/AppPage";
import { createUser, AuthContext } from "../../context/authContext/index";

interface CreacionUsuarioProps {}

const CreacionUsuario: React.FC<CreacionUsuarioProps> = () => {
	// Referencias a elementos
	const nombreInputRef = useRef<HTMLIonInputElement>(null);
	const apellidosInputRef = useRef<HTMLIonInputElement>(null);
	const usuarioInputRef = useRef<HTMLIonInputElement>(null);
	const correoInputRef = useRef<HTMLIonInputElement>(null);
	const contraInputRef = useRef<HTMLIonInputElement>(null);

	// Hook para acceder al sistema de navegación programática en React
	const history = useHistory();

	// Obtenemos estado de autorización y función dispatch desde el provider context más cercano
	let { authState, dispatch } = React.useContext(AuthContext) as any;

	const enCrearCuenta = () => {
		try {
			// Enviamos información ingresada por usuario a función de creación de cuenta
			const params = {
				// Las propiedades deben coincidir con el modelo en C# para usuarios
				nuevoUsuario: {
					Nombre: nombreInputRef.current!.value,
					Apellidos: apellidosInputRef.current!.value,
					NombreUsuario: usuarioInputRef.current!.value,
					CorreoElectronico: correoInputRef.current!.value,
					Contraseña: contraInputRef.current!.value,
				},
			};

			createUser(dispatch, params)
				.then(() => {
					// Éxito en el inicio de sesión, redireccionamos a pantalla principal
					history.push(RUTA_PAGINA_PRINCIPAL);
				})
				.catch((err) => {
					// Error en el inicio de sesión
					if (err) {
						// Error. Lo mostramos al usuario, debería encausarse con errores de interacción
						// usuario/interfaz (como campos faltantes o con información inválida) sin
						// embargo no se encausa ya que este error ocurre en un proceso asíncrono
						console.error(err);
            // setTextoToast(err);
						// setMostrarToast(true);
					}
				});
		} catch (err) {
			// Estar al pendiente, fallará si no recibe un objeto de error válido
      console.error(err);
			// setTextoToast(err);
			// setMostrarToast(true);
		}
	};

	return (
		<AppPage esVistaSecundaria={true}>
			<IonGrid>
				<IonRow>
					<IonCol>
						<IonItem>
							<IonLabel position="floating">Nombre</IonLabel>
							<IonInput
								ref={nombreInputRef}
								id="nombre"
								type="text"
							/>
						</IonItem>
					</IonCol>
				</IonRow>
				<IonRow>
					<IonCol>
						<IonItem>
							<IonLabel position="floating">Apellidos</IonLabel>
							<IonInput
								ref={apellidosInputRef}
								id="apellidos"
								type="text"
							/>
						</IonItem>
					</IonCol>
				</IonRow>
				<IonRow>
					<IonCol>
						<IonItem>
							<IonLabel position="floating">
								Nombre de usuario
							</IonLabel>
							<IonInput
								ref={usuarioInputRef}
								id="usuario"
								type="text"
							/>
						</IonItem>
					</IonCol>
				</IonRow>
				<IonRow>
					<IonCol>
						<IonItem>
							<IonLabel position="floating">
								Correo electrónico
							</IonLabel>
							<IonInput
								ref={correoInputRef}
								id="correo-electronico"
								type="text"
							/>
						</IonItem>
					</IonCol>
				</IonRow>
				<IonRow>
					<IonCol>
						<IonItem>
							<IonLabel position="floating">Contraseña</IonLabel>
							<IonInput
								ref={contraInputRef}
								id="contraseña"
								type="password"
							/>
						</IonItem>
					</IonCol>
				</IonRow>
				<IonRow>
					<IonCol>
						<IonButton
							fill="solid"
							expand="block"
							color="primary"
							onClick={enCrearCuenta}
							disabled={false}
						>
							Crear cuenta
						</IonButton>
					</IonCol>
				</IonRow>
			</IonGrid>
		</AppPage>
	);
};

export default CreacionUsuario;

import {
	IonButton,
	IonCol,
	IonGrid,
	IonInput,
	IonItem,
	IonLabel,
	IonLoading,
	IonRow,
	IonToast,
} from "@ionic/react";
import React, { useRef } from "react";
import { useHistory } from "react-router";
import { RUTA_PAGINA_PRINCIPAL } from "../../bk-constantes";
import AppPage from "../../components/AppPage";
import { createUser, AuthContext } from "../../context/authContext/index";

interface CreacionUsuarioProps {}

// interface IniciarSesionState
// {
//   msjError: string | null
// }

// const estadoInicial: IniciarSesionState = {
//   msjError: null
// }

const CreacionUsuario: React.FC<CreacionUsuarioProps> = () => {
	// Referencias a elementos
	const nombreInputRef = useRef<HTMLIonInputElement>(null);
	const apellidosInputRef = useRef<HTMLIonInputElement>(null);
	const usuarioInputRef = useRef<HTMLIonInputElement>(null);
	const correoInputRef = useRef<HTMLIonInputElement>(null);
	const contraInputRef = useRef<HTMLIonInputElement>(null);
	const confirmContraInputRef = useRef<HTMLIonInputElement>(null);

	// Hook para acceder al sistema de navegación programática en React
	const history = useHistory();

	// Obtenemos estado de autorización y función dispatch desde el provider context más cercano
	let { dispatch } = React.useContext(AuthContext) as any;

	// Variables de estado
	let [msjError, setMsjError] = React.useState<string | null>(null);
	let [procesando, setProcesando] = React.useState<boolean>(false);

	const validarFormulario = () => {
		let nombre = nombreInputRef.current?.value;
		let apellidos = apellidosInputRef.current?.value;
		let usuario = usuarioInputRef.current?.value;
		let correo = correoInputRef.current?.value;
		let contra = contraInputRef.current?.value;
		let confirmContra = confirmContraInputRef.current?.value;

		if (
			nombre === "" ||
			apellidos === "" ||
			usuario === "" ||
			correo === "" ||
			contra === "" ||
			confirmContra === ""
		) {
			setMsjError("Todos los campos son obligatorios");
			return false;
		}

		if (contra !== confirmContra) {
			setMsjError("Las contraseñas no coinciden");
			return false;
		}

		return true;
	}

	const enCrearCuenta = () => {
		if (!validarFormulario()) {
			return;
		}

		// Mostramos un loader que bloquea la interacción con la interfaz
		setProcesando(true);

		// Enviamos información ingresada por usuario a función de creación de cuenta
		const params = {
			// Las propiedades deben coincidir con el modelo en C# para usuarios
			nuevoUsuario: {
				Nombre: nombreInputRef.current!.value,
				Apellidos: apellidosInputRef.current!.value,
				NombreUsuario: usuarioInputRef.current!.value,
				CorreoElectronico: correoInputRef.current!.value,
				Contrasenia: contraInputRef.current!.value,
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
					setMsjError("Ocurrió un error al procesar su solicitud");
				}
			})
			.finally(() => {
				// Ocultamos el loader
				setProcesando(false);
			});
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
								required={true}
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
								required={true}
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
								required={true}
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
								required={true}
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
								id="contrasenia"
								type="password"
								required={true}
							/>
						</IonItem>
					</IonCol>
				</IonRow>
				<IonRow>
					<IonCol>
						<IonItem>
							<IonLabel position="floating">Confirme contraseña</IonLabel>
							<IonInput
								ref={confirmContraInputRef}
								id="confirm_contrasenia"
								type="password"
								required={true}
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
			<IonToast
        isOpen={Boolean(msjError)}
        onDidDismiss={() => setMsjError(null)}
        message={msjError ?? ''}
        duration={3000}
				color="danger"
      />
			<IonLoading
        cssClass="my-custom-class"
        isOpen={procesando}
        // onDidDismiss={() => setProcesando(false)}
        message={'Procesando...'}
      />
		</AppPage>
	);
};

export default CreacionUsuario;

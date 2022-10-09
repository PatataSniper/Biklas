import { IonButton, IonCol, IonGrid, IonInput, IonItem, IonLabel, IonLoading, IonRow, IonToast } from "@ionic/react";
import React, { FunctionComponent, useRef, useState } from "react";
import { USUARIOS_CONTROLLER } from "../../bk-constantes";
import { llamadaAjax } from "../../bk-utils";
import AppPage from "../../components/AppPage";
import { ClientConfig } from "../../config/client-config";

interface RecuperacionContraProps {
  
}
 
const RecuperacionContra: FunctionComponent<RecuperacionContraProps> = () => {
  const correoInputRef = useRef<HTMLIonInputElement>(null);

	const [procesando, setProcesando] = useState<boolean>(false);
	const [textoToast, setTextoToast] = useState<string | null>(null);
  
  const recuperarContra = () => {
    // obtenemos el correo ingresado por el usuario
    const correo = correoInputRef.current?.value;

    if(!correo){
      // Sin correo válido, no continuamos con la ejecución
      console.error("Sin correo válido");
      return;
    }

    // Preparamos los parametros y la configuración de la llamada y realizamos llamada
    const data = {
      correo
    }

    const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
		};

		// Desplegamos el indicador de procesamiento
		setProcesando(true);

    llamadaAjax(USUARIOS_CONTROLLER, "RecuperarContrasenia", data, requestOptions).then((result) => {
      // Éxito en la llamada
			setTextoToast('Se ha enviado con éxito el correo de recuperación de contraseña');
    }).catch(error => {
			// Error en la llamada
			console.error(error);
			let msj = "Error durante envío de correo de recuperación de contraseña";

			// Agregamos información de error al mensaje del toast en caso de estar corriendo la
			// aplicación en modo de depuración
			msj += ClientConfig.DEBUG_MODE ? `: ${error}` : "";
			setTextoToast(msj);
		}).finally(() => {
			// Ocultamos el indicador de procesamiento
			setProcesando(false);
		})
  }

  return ( 
    <AppPage esVistaSecundaria={true}>
			<IonGrid>
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
						<IonButton
							fill="solid"
							expand="block"
							color="primary"
							onClick={recuperarContra}
							disabled={false}
						>
							Recuperar contraseña
						</IonButton>
					</IonCol>
				</IonRow>
			</IonGrid>
			<IonToast
				isOpen={textoToast !== null}
				onDidDismiss={() => setTextoToast(null)}
				message={textoToast ?? ""}
				position="bottom"
				duration={3000}
				color="warning"
			/>
			<IonLoading
				isOpen={procesando}
				// onDidDismiss={() => setProcesando(false)}
				message={"Procesando..."}
			/>
		</AppPage>
   );
}
 
export default RecuperacionContra;
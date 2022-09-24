import { IonButton, IonCol, IonGrid, IonInput, IonItem, IonLabel, IonRow } from "@ionic/react";
import React, { FunctionComponent, useRef } from "react";
import { USUARIOS_CONTROLLER } from "../../bk-constantes";
import { llamadaAjax } from "../../bk-utils";
import AppPage from "../../components/AppPage";

interface RecuperacionContraProps {
  
}
 
const RecuperacionContra: FunctionComponent<RecuperacionContraProps> = () => {
  const correoInputRef = useRef<HTMLIonInputElement>(null);
  
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

    llamadaAjax(USUARIOS_CONTROLLER, "RecuperarContrasenia", data, requestOptions).then((result) => {
      // Éxito en la llamada
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
		</AppPage>
   );
}
 
export default RecuperacionContra;
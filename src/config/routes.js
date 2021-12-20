import InicioSesion from "../domain/InicioSesion/InicioSesion"
import Rodar from "../domain/Inicio/Inicio"
import Rutas from "../domain/Rutas/Rutas"
import Amigos from "../domain/Amigos/Amigos"

/*
    Estructura obtenida de:
    https://soshace.com/react-user-login-authentication-using-usecontext-and-usereducer/
    Está pensada para utilizar en aplicaciones programadas con React, encontrar la manera
    de implementar en aplicaciones que implementen Ionic. Para esto deberíamos poder enviar
    un componente como parametro 'component'.
    Ejemplo:
    {
        path:'/inicio',
        component: <Inicio></Inicio>
    }
*/

const routes = [
    {
      path:'/',
      component: InicioSesion
    },
    // {
    //   path:'/inicio',
    //   component: Inicio
    // },
    {
        path:'/rodar',
        component: Rodar
    },
    {
        path:'/rutas/:id',
        component: Rodar
    },
    {
        path:'/rutas',
        component: Rutas
    },
    {
        path:'/amigos',
        component: Amigos
    },
    {
        path:'/inicioSesion',
        component: InicioSesion
    }
  ]
   
  export default routes
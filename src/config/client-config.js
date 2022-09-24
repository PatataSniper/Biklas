// Biklas (2021)
// Configuración general de comportamiento del cliente

export class ClientConfig {
    // Cadenas de conexión a servicios
    static URL_API_LOCAL = "https://localhost:7165/api/";
    static URL_API_AZURE = "https://biklasapi.azurewebsites.net/api/";

    // Servicio a utilizar
    static URL_API = this.URL_API_LOCAL;
}
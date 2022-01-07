import React from "react"

/**
 * Interface for modeling a user object
 */
export interface usuario {
    id: number,
    nombreUsuario: string,
    nombre: string,
    apellidos: string,
    contraseña: string,
    fechaNacimiento: Date,
    kmRecorridos: number,
    sonAmigos: boolean
}
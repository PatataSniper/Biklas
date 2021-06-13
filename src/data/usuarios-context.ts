import React from "react"

export interface usuario {
    id: number,
    nombre: string,
    apellidos: string,
    contraseña: string,
    fechaNacimiento: Date,
    kmRecorridos: number
}
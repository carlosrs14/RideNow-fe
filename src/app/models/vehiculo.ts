export class Vehiculo {
    id: number;
    marca: string;
    modelo: number;
    placa: string;
    tieneAire: boolean;
    color: string;
    capacidad: number;
    idPrestadorDeServicio: number;
    
    constructor(id: number, marca: string, modelo: number, placa: string, tieneAire: boolean, color: string, capacidad: number, idPrestadorDeServicio: number) {
        this.id = id;
        this.marca = marca;
        this.modelo = modelo;
        this.placa = placa;
        this.tieneAire = tieneAire;
        this.color = color,
        this.capacidad = capacidad,
        this.idPrestadorDeServicio = idPrestadorDeServicio;
    }
}
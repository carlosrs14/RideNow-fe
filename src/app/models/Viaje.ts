export class Viaje {
    id: number;
    fecha: Date;
    hora: number;
    tipo: string;
    precio: number;
    idVehiculo: number;
    idLocacionOrigen: number;
    idLocacionDestino: number;

    constructor(id: number, fecha: Date, hora: number, tipo: string, precio: number, idVehiculo: number, idLocacionOrigen: number, idLocacionDestino: number) {
        this.id = id;
        this.fecha = fecha;
        this.hora = hora;
        this.tipo = tipo;
        this.precio = precio;
        this.idVehiculo = idVehiculo;
        this.idLocacionOrigen = idLocacionOrigen;
        this.idLocacionDestino = idLocacionDestino;
    }
}
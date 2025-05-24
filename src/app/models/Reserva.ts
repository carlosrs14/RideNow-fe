export class Reserva {
    id: number;
    fecha: Date;
    idCliente: number;
    idPago: number;
    idViaje: number;
    
    constructor(id: number, fecha: Date, idCliente: number, idPago: number, idViaje: number) {
        this.id = id;
        this.fecha = fecha;
        this.idCliente = idCliente;
        this.idPago = idPago;
        this.idViaje = idViaje;
    }
}
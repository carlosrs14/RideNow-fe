export class Review {
    id: number;
    calificacion: number;
    comentario: string;
    fecha: Date;
    idCliente: number;
    idPrestador: number;

    constructor(id: number, calificacion: number, comentario: string, fecha: Date, idCliente: number, idPrestador: number) {
        this.id = id;
        this.fecha = fecha;
        this.calificacion = calificacion;
        this.comentario = comentario;
        this.idCliente = idCliente;
        this.idPrestador = idPrestador;
    }
}
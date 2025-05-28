export class Review {
    id: number;
    calificacion: number;
    comentario: string;
    fecha: Date;
    idCliente: number;

    constructor(id: number, calificacion: number, comentario: string, fecha: Date, idCliente: number) {
        this.id = id;
        this.fecha = fecha;
        this.calificacion = calificacion;
        this.comentario = comentario;
        this.idCliente = idCliente;
    }
}
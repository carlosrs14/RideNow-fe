export class Denuncia {
    id: number;
    fecha: Date;
    descripcion: string;
    estado: string;
    idCliente: number;
    idPrestadorDeServicio: number;

    constructor(id: number, fecha: Date, descripcion: string, estado: string, idCliente: number, idPrestadorDeServicio: number) {
        this.id = id;
        this.fecha = fecha;
        this.descripcion = descripcion;
        this.estado = estado;
        this.idCliente = idCliente;
        this.idPrestadorDeServicio = idPrestadorDeServicio;
    }
}
export class Usuario {
    id: number;
    nombre: string;
    apellido: string;
    tipo: string;
    email: string;
    fechaNacimiento: Date;
    telefono: string;
    password: string;
    
    constructor(id: number, nombre: string, apellido: string, tipo: string, email: string, fechaNacimiento: Date, telefono: string, password: string) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.tipo = tipo;
        this.email = email;
        this.fechaNacimiento = fechaNacimiento;
        this.telefono = telefono;
        this.password = password;
    }
}
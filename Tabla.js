class Tabla{
    constructor(){
        this.nombres_ramas = new Array();
        this.ramas = new Map();
    }

    nueva_rama(nombre, rama){
        this.ramas.set(nombre, rama);
        this.nombres_ramas.push(nombre);
    }

    mostrar(){
        console.log("---------------TABLA---------------\n");

    }


}
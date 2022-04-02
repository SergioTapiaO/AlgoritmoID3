class Subrama{

    constructor(){
        this.merito = 0;
        this.nombres = new Array();
        this.elementos = new Map();
    }

    nuevoElem(name, elem){
        this.nombres.push(name);
        this.elementos.set(name, elem);
        this.merito = this.merito + elem.get_merito();
    }

    set_merito(merito){
        this.merito = merito;
    }

    mostrar(){
        for(var [key, value] of this.elementos){
            console.log(key);
            this.elementos.get(key).mostrar();
        }
    }

}
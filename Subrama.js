class Subrama{

    constructor(){
        this.merito = 0;
        this.nombres = new Array();
        this.elementos = new Map();
    }
    
    iniciar(){
        if(!leerAtributos || !contenido){alert("Debes cargar los ficheros antes de calcular")}
        columnas = atributos.length;
    
        //let meritos = new Array();
        let menor = 1;
        let eleccion;
        let tabla = new Tabla();
    
        //tratamos cada columna para calcular sus meritos
        // -1 porque la ultima columna es el valor
        for(let i = 0; i < columnas - 1; i++){
        let subrama = new Subrama();
        let x = merito(i, subrama);
        subrama.set_merito(x);
        //añadimos la subrama a la tabla
        tabla.nueva_rama(atributos[i], subrama);
    
        //meritos.push(x);
        if(x < menor){
            menor = x;
            eleccion = i;
        }
        }
        //meritos.sort();
        //console.log(tabla.ramas.get(atributos[eleccion]).nombres);
        //let filas_elem = tabla.lineas_elem(matriz, eleccion, tabla.ramas.get(atributos[eleccion]).nombres, matriz.length, columnas);
    // console.log(tabla);
        tabla.mostrar();
        
    
    }
    
    merito(col, subrama){
        let hasmap = new Map();
        let resul = new Map();
    
        //let nombres = new Array();
        // guardamos los a por cada valor en un hashmap
        for(let i = 0; i < matriz.length; i++){
        // si es la primera vez que metemos el elemento en el hashmap
        if(hasmap.has(matriz[i][col]) ){
            let val = hasmap.get(matriz[i][col]);
            hasmap.set(matriz[i][col], val + 1);
    
            if(matriz[i][columnas - 1] == "si"){
            let val2 = resul.get(matriz[i][col]);
            // si es und es que sale por primera vez
            if(val2 == undefined)
                val2 = 0;
            resul.set(matriz[i][col], val2 + 1);
            }
    
        }
        else{
            hasmap.set(matriz[i][col], 1);
    
            if(matriz[i][columnas - 1] == "si"){
            let val2 = resul.get(matriz[i][col]);
            // si es und es que sale por primera vez
            if(val2 == undefined)
                val2 = 0;
            resul.set(matriz[i][col], val2 + 1);
            }
        }
        }
        //console.log(hasmap);
        //console.log(resul);
    
        let merito = 0;
        //para cada elemento distinto de la rama
        for(var [key, value] of hasmap){
    
        let n = hasmap.get(key) - resul.get(key);
        let elem = new Elemento(key, hasmap.get(key), resul.get(key), n, matriz.length);
        //calculamos el mertito para cada elemento
        merito = merito + elem.get_merito();
        // y luego lo sumamos al total de la subrama
        subrama.nuevoElem(key, elem);
        }
    
        return merito;
    }
  
    nuevoElem(name, elem){
        this.nombres.push(name);
        this.elementos.set(name, elem);
        this.merito = elem.get_merito();
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
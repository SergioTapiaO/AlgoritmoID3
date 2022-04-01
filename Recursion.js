"use strict"

class Recursion{
    constructor(){
        this.matriz = new Array();
        this.contenido = null;
        this.atributos = null;
        this.columnas = -1

    }

    setAtributos(atributos){
        this.atributos = atributos;
        this.columnas = this.atributos.length;
    }

    setContenido(contenido){
        this.contenido = contenido;
    }

    calcularMatriz(){
        let lineas = this.contenido.split("\r\n");
         lineas.forEach(linea => {
            this.matriz.push(linea.split(","));
        });
    }

    iniciar(){
        if(this.atributos == null || this.contenido == null){alert("Debes cargar los ficheros antes de calcular")}
        else{
            this.calcularMatriz();
            this.recursion()
        }
    }

    recursion(){
        
      
        //let meritos = new Array();
        let menor = 1;
        let eleccion;
        let tabla = new Tabla();
      
        //tratamos cada columna para calcular sus meritos
        // -1 porque la ultima columna es el valor
        for(let i = 0; i < this.columnas - 1; i++){
          let subrama = new Subrama();
          let x = this.merito(i, subrama);
          subrama.set_merito(x);
          //añadimos la subrama a la tabla
          tabla.nueva_rama(this.atributos[i], subrama);
      
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
        for(let i = 0; i < this.matriz.length; i++){
          // si es la primera vez que metemos el elemento en el hashmap
          if(hasmap.has(this.matriz[i][col]) ){
            let val = hasmap.get(this.matriz[i][col]);
            hasmap.set(this.matriz[i][col], val + 1);
      
            if(this.matriz[i][this.columnas - 1] == "si"){
              let val2 = resul.get(this.matriz[i][col]);
              // si es und es que sale por primera vez
              if(val2 == undefined)
                val2 = 0;
              resul.set(this.matriz[i][col], val2 + 1);
            }
      
          }
          else{
            hasmap.set(this.matriz[i][col], 1);
      
            if(this.matriz[i][this.columnas - 1] == "si"){
              let val2 = resul.get(this.matriz[i][col]);
              // si es und es que sale por primera vez
              if(val2 == undefined)
                val2 = 0;
              resul.set(this.matriz[i][col], val2 + 1);
            }
          }
        }
        //console.log(hasmap);
        //console.log(resul);
      
        let merito = 0;
        //para cada elemento distinto de la rama
        for(var [key, value] of hasmap){
      
          let n = hasmap.get(key) - resul.get(key);
          let elem = new Elemento(key, hasmap.get(key), resul.get(key), n, this.matriz.length);
          //calculamos el mertito para cada elemento
          merito = merito + elem.get_merito();
          // y luego lo sumamos al total de la subrama
          subrama.nuevoElem(key, elem);
        }
        return merito;
    }
    
    lineas_elem(matriz, col, nombres, nfilas, ncols){
        let nuevaMatriz;
        let primero = true;
        let valor;
        let iguales = true;
        for(let i = 0; i < nfilas; i++){
            for(let j = 0; j < nombres.length; j++){
                if(matriz[i][col] == nombres[j]){
                    /*if(primero)
                        valor = matriz[i][matriz.length - 1];
                        primero = false;
                    if(valor != matriz[i][matriz.length - 1])
                        iguales = false;*/
                }
            }
        }
        return iguales;
    }
}
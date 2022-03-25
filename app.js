"use strict"

var contenido = null;
var atributos = null;
var leerAtributos = false;
var leerContenido = false;
let matriz = new Array();
var columnas = undefined;

$(function () {
  //FORMULA MERITO
  let x = 5/8*(-2/5*Math.log2(2/5) - 3/5*Math.log2(3/5)) + 3/8*(-2/3*Math.log2(2/3) - 1/3*Math.log2(1/3));

    atributos = leerFichero1();
    contenido = leerFichero2();

    $("#calcular").on("click", iniciar);
});

function leerFichero1(){
    document.getElementById('atributos').addEventListener('change', function() {
        var file = new FileReader();
        file.onload = () => {
          document.getElementById('output').textContent = file.result;
          atributos = file.result;
          atributos = atributos.split(",");
         leerAtributos = true;
        }
        file.readAsText(this.files[0]);
        
      });
}

function leerFichero2(){
    document.getElementById('contenido').addEventListener('change', function() {
        var file = new FileReader();
        file.onload = () => {
          document.getElementById('output1').textContent = file.result;
          contenido = file.result;
         let lineas = contenido.split("\r\n");
         lineas.forEach(linea => {
            matriz.push(linea.split(","));
          });
          leerContenido = true;
        }
        file.readAsText(this.files[0]);
        
      });
}

function iniciar(){
  console.log(contenido);
  console.log(atributos);
  console.log(matriz);

  columnas = atributos.length;

  //let meritos = new Array();
  let menor = 0;
  let eleccion;
  //tratamos cada columna para calcular sus meritos
  // -1 porque la ultima columna es el valor
  for(let i = 0; i < columnas - 1; i++){
    let x = merito(i);
    //meritos.push(x);
    if(x > menor){
      menor = x;
      eleccion = i;
    }
  }
  //meritos.sort();
  console.log(eleccion);
}

function merito(col){
  let hasmap = new Map();
  let resul = new Map();
  /* for(let i = 0; i < matriz.length; i++){

    if(matriz[i][matriz.length - 1] == "si"){
      let punteroValorSi = hasmap.get(matriz[i][col] + "si");
      if(punteroValorSi != undefined){
        punteroValorSi += 1;
      }else{
        hasmap.set(matriz[i][col] + "si", 1);
      }
    }else{
      let punteroValorNo = hasmap.get(matriz[i][col] + "no");
      if(punteroValorNo != undefined){
        punteroValorNo += 1;
      }else{
        hasmap.set(matriz[i][col] + "no", 1);
      }
    }
  }  */

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
  console.log(hasmap);
  console.log(resul);

  let merito = 0;
  //para cada elemento distinto de la rama
  for(var [key, value] of hasmap){
    let n = hasmap.get(key) - resul.get(key);
    let subrama = new rama(hasmap.get(key), resul.get(key), n, matriz.length);
    merito = merito + subrama.calcularMerito();
  }

  return merito;
}

function dividir(){
  
}
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
  columnas = atributos.length;

  let menor = 1;
  let eleccion;
  let tabla = new Tabla();

  //tratamos cada columna para calcular sus meritos
  // -1 porque la ultima columna es el valor
  for(let i = 0; i < columnas - 1; i++){
    let subrama = new Subrama();
    let x = merito(i, subrama, matriz);
    subrama.set_merito(x);
    //añadimos la subrama a la tabla
    tabla.nueva_rama(atributos[i], subrama);

    //meritos.push(x);
    if(x < menor){
      menor = x;
      eleccion = i;
    }
  }

  tabla.mostrar();
  
  let nombresElems = tabla.ramas.get(atributos[eleccion]).nombres;
  atributos.splice(eleccion, 1);
  recursion(eleccion, atributos, matriz, columnas, nombresElems);    

}

function quitarColumna(matrizV, col){
  let matrizN = new Array();
  for(let i = 0; i< matrizV.length; i++){
    matrizV[i].splice(col, 1);
  }
  matrizN = matrizV;
  return matrizN;
}

function quitarRama(listaAtributos, col){
  let array = new Array();
  for(let i = 0; i < listaAtributos.length; i++){
    if(i != col){
      array.push(listaAtributos[i]);
    }
  }
  return array;
}

//comprobamos si son todos si's o no's
function comprobar_final(listaEjemplos, cols){
  //guardamos el primer elem
  let valor = listaEjemplos[0][listaEjemplos[0].length - 1];
  let iguales = true;

  for(let i = 1; i< listaEjemplos.length && iguales; i++){
      if(listaEjemplos[i][listaEjemplos[i].length - 1] != valor){
          iguales = false;
      }
  }
  return iguales;
}

//comprobamos cuantos atributso quedan
function comprobar_atributos(listaAtributos){
  if(listaAtributos.length == 1 || listaAtributos == 0){
    return false;
  }
  return true;
}

function merito(col, subrama, matriz){
  let hasmap = new Map();
  let resul = new Map();

  //let nombres = new Array();
  // guardamos los a por cada valor en un hashmap
  for(let i = 0; i < matriz.length; i++){
    // si no es la primera vez que metemos el elemento en el hashmap
    if(hasmap.has(matriz[i][col]) ){
      let val = hasmap.get(matriz[i][col]);
      hasmap.set(matriz[i][col], val + 1);

      if(matriz[i][matriz[i].length - 1] == "si"){
        let val2 = resul.get(matriz[i][col]);
        // si es und es que sale por primera vez
        if(val2 == undefined)
          val2 = 0;
        resul.set(matriz[i][col], val2 + 1);
      }
    }
    else{
      hasmap.set(matriz[i][col], 1);

      if(matriz[i][matriz[i].length - 1] == "si"){
        let val2 = resul.get(matriz[i][col]);
        // si es und es que sale por primera vez
        if(val2 == undefined)
          val2 = 0;
        resul.set(matriz[i][col], val2 + 1);
      }
      else{
        resul.set(matriz[i][col], 0);
      }
    }
  }

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

function recursion(col, listaAtributos, listaEjemplos, final, elementos){
  //comrobar que no sean todos si o no
  if(!comprobar_final(listaEjemplos, final)){

    //tantas ramas como atributos o elementos
    for(let i = 0; i < elementos.length; i++){

      let nuevo_contenido = new Array();

      for(let j = 0; j < listaEjemplos.length;  j++){
        if(listaEjemplos[j][col] == elementos[i]){
          nuevo_contenido.push(listaEjemplos[j]);
        }
      } //for interno 1

      //COMPROBAR EL FINAL 
      if(!comprobar_final(nuevo_contenido, final)){
        let menor = 1;
        let tabla = new Tabla();
        let eleccion;
        nuevo_contenido = quitarColumna(nuevo_contenido, col);
        //tantas ramas como atributos o elementos
        for(let j = 0; j < listaAtributos.length - 1;  j++){ 
          //calcular id3 para la nueva tabla
          let subrama = new Subrama();
          let x = merito(j, subrama, nuevo_contenido);
          subrama.set_merito(x);
          //añadimos la subrama a la tabla
          tabla.nueva_rama(listaAtributos[j], subrama);

          if(x < menor){
            menor = x;
            eleccion = j;
          }
        } //for interno 2
        // sacar la de menos merito 
        //recurison aqui
        let nombresElems = tabla.ramas.get(atributos[eleccion]).nombres;

        recursion(eleccion, quitarRama(listaAtributos, eleccion), nuevo_contenido, final - 1, nombresElems);
    }
    else{
      //FINAL
    }

    } //for externo

  }
  else{
    //se termina

  }
}
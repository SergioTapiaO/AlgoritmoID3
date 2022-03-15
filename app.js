"use strict"

var contenido = null;
var atributos = null;

$(function () {
    atributos = leerFichero1();
    contenido = leerFichero2();
});

function leerFichero1(){
    document.getElementById('atributos').addEventListener('change', function() {
        var file = new FileReader();
        file.onload = () => {
          document.getElementById('output').textContent = file.result;
          atributos = file.result;
          mostrar(atributos);
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
          mostrar(contenido);
        }
        file.readAsText(this.files[0]);
        
      });
}

function mostrar(x){
    let j = x.split("\n");
    console.log(j);
    console.log(j[1]);
}


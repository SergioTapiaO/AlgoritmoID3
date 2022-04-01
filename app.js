"use strict"

$(function () {
  //FORMULA MERITO
  //let x = 5/8*(-2/5*Math.log2(2/5) - 3/5*Math.log2(3/5)) + 3/8*(-2/3*Math.log2(2/3) - 1/3*Math.log2(1/3));

  leerFichero1();
  leerFichero2();
  
  let ej = new Recursion();
    
  function leerFichero1(){
    document.getElementById('atributos').addEventListener('change', function() {
      var file = new FileReader();
      file.onload = () => {
        document.getElementById('output').textContent = file.result;
        let atributos = file.result;
        atributos = atributos.split(",");
        ej.setAtributos(atributos);
      }
      file.readAsText(this.files[0]);
    });
  }

  function leerFichero2(){
    document.getElementById('contenido').addEventListener('change', function() {
      var file = new FileReader();
      file.onload = () => {
        document.getElementById('output1').textContent = file.result;
        let contenido = file.result;
        ej.setContenido(contenido);
      }
      file.readAsText(this.files[0]); 
    });
  }
  
  $("#calcular").on("click", function() {
    ej.iniciar();
  });
});


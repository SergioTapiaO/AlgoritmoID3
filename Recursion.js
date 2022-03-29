class Recursion{
    constructor(matriz){
        this.matriz = matriz;
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
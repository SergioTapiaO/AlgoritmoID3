class rama{

    constructor(a, p, n, total){
        this.a = a;
        this.p = p/a;
        this.n = n/a;
        this.total = total;
        this.r = a/total;
    }

    calcularMerito(){
        if(this.p == 0 || this.n == 0)
            return 0;
        return this.r*(-this.p*Math.log2(this.p) - this.n*Math.log2(this.n));
    }
}
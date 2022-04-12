
class Vue{
    name:string;
    constructor(params:any){
        this.name = params.name;
        this.init()
    }

    init(){
        let res = this.name.includes("vans");
        console.warn(res,"wenjainjia")
    }
}

export {
    Vue
}
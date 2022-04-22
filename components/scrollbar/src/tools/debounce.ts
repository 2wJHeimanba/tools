

// 防抖函数
export function debounce(fn:any,delay:number){
    return function(args?:any){
        let that = this;
        let _args = args;
        clearTimeout(fn.id);
        fn.id = setTimeout(function(){
            fn.call(that,_args)
        },delay)
    }
}
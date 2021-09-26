//写一个js闭包（1）
function debounce(fn,time = 100){
    let timer;
    return function(){
        let args = arguments;
        if(timer){
            clearTimeout(timer)
        }
        else{
            timer = setTimeout(()=>{
                fn.apply(this,args)
            })
        }
    }
}


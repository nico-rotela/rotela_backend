const form = document.getElementById('ptoductForm');

form.addEventListener('submit',e=>{
    e.preventDefault();
    const data = new FormData(form);
    console.log(data);
    const obj = {};
    data.forEach((value,key)=>obj[key]=value);
    console.log("Objeto formado:");
    console.log(obj);
    fetch('/api/productos',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result=>{

        if(result.status === 201){
            result.json()
            alert("producto agregado con exito")
            window.location.replace('/api/prodviews')

        }else{
            alert("no se pudo agregar el producto a la base de datos")
            console.log(error);
        }
    }).then(json=>console.log(json));
        
})
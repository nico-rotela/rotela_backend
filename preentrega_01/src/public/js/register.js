const form = document.getElementById('registerForm');

form.addEventListener('submit',e=>{
    e.preventDefault();
    const data = new FormData(form);
    console.log(data);
    const obj = {};
    data.forEach((value,key)=>obj[key]=value);
    console.log("Objeto formado:");
    console.log(obj);
    fetch('/api/session/register',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result=>{

        if(result.status === 200){
            result.json()
            alert("usuario creado con exito")
            window.location.replace('/api/users/login')
  
        }else{
            alert("no se pudo crear el usuario")
        }
    }).then(json=>console.log(json));
        
})
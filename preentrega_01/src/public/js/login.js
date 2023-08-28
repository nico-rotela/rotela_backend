const form = document.getElementById('loginForm');

form.addEventListener('submit',e=>{
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value,key)=>obj[key]=value);
    fetch('/api/session/login',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result =>{
        if(result.status===200){
            alert("Login realizado con exito!");
            window.location.replace('/api/users');
        } else if (result.status === 400){
            alert("Login invalido revisa completar todos los campos y que sean correctos");
        }
    }
    )
})
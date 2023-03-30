// config. lado del cliente
const socket = io()
socket.emit('msg', 'hola desde el lado del cliente')
socket.on('msg_02', data => {
    console.log(data);
})



const input = document.getElementById('textprod')
const log = document.getElementById('log')


input.addEventListener('keyup',evt=>{
    if(evt.key==="Enter"){
        socket.emit('producto',input.value);
        input.value=""
    }
});
socket.on('log',data=>{
    let logs='';
    data.logs.forEach(log=>{
        logs +=  `se agrego el producto: ${log.producto}, con el id: ${log.socketid}<br/>`
        
    })
    log.innerHTML=logs;
});
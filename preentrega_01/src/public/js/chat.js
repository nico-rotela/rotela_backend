const socket = io()

let user;
const chatBox = document.getElementById('chatBox')

// aplicando swet alert
swal.fire({
    icon: 'info',
    title: 'identificate, por favor',
    input: 'text',
    text: 'ingrese el email para usar en el chat.',
    color: '#716add',
    inputValidator: (value)=>{
        if(!value){
            return 'necesitas escribir tu email de usuario.!'
        }else{
            // utilizamos socket ya que el usuario estaria validado
            socket.emit('userConnected', {user: value})
        }
    },
    allowOutsideClick: false //esto es para no dejar cerrar el popapp dando click por fuera
}).then( result => {
    user = result.value
}
)
  
// guardar mensajes por usuario y mostrarlo en nuestro log de mensajes.
chatBox.addEventListener('keyup', evt => {
    if(evt.key === 'Enter'){
        if(chatBox.value.trim().length > 0){
            socket.emit('message', {user: user, message: chatBox.value})
            chatBox.value = ''
        }else{
            alert('por favor escribir un mensaje, no se puede enviar un mensaje en blanco')
        }
    }
})

// escuchamos todos los usuarios que estan conectados
socket.on('messageLogs', data => {
    const messageLogs = document.getElementById('messageLogs') //este messageLogs es la etiqueta <p> del handelebars para que se dibuje en la pantalla 

    let logs='';

    // hago un foreach por que la data que me llega es el array que contiene los mensajes
    data.forEach(log => {
        logs += `${log.user} dice: ${log.message}<br/>`
    })
    messageLogs.innerHTML=logs
})

// al usuario le llega la notificacion de usuario conectado al chat

socket.on('userConnected', data => {
    let message = `nuevo usuario conectado: ${data}`

    swal.fire({
        icon: 'info',
        title: 'nuevo usario conectado en el chat',
        text: message,
        toast: true,
        color: '#716add'
    })
})
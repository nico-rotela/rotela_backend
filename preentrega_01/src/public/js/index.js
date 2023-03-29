// config. lado del cliente
const socket = io()
socket.emit('msg', 'hola desde el lado del cliente')

const form = document.getElementById("formulario")

console.log(form);
socket.emit('holis', form)




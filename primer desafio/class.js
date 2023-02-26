class productManager {

    constructor (titulo, descripcion, precio, img, id, stock) {
       this.producto = []
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.precio = precio;
        this.img = img;
        this.id = id;
        this.stock = stock;
    }

   //  metodos

   // agregar un producto
    addProduct(titulo, descripcion, precio, img, id, stock) {
       let productoId = this.producto.find(producto => producto.id === id)
           if (productoId) {
               console.log("objeto creado")
           } else {
               const prodAdd = {titulo, descripcion, precio, img, id, stock}
               this.producto.push(prodAdd)
           }
       }


   //  devolver el producto
    getProduct() {
       return this.producto
    }

    getProductById(id) {
       let productoPorId = this.producto.find(prod => prod.id === id)
       if(productoPorId) {
          return productoPorId
       }else {
           console.log("el producto no existe")
       }
    }
}

const producto1 = new productManager ("monitor", "monitor Asus 21'", "$50.000", "imagen", 3, 6)

const producto = new productManager()

console.log("array vacio")
console.log(producto.getProduct())

console.log("primer producto agregado")
producto.addProduct("monitor", "monitor de 21' full hd", "$22144", "imagen", 1, 3)
console.log(producto.getProduct())

console.log("segundo producto agregado")
producto.addProduct("mouse", "mouse logitech 10000 dpi", "$5000", "imagen", 2, 3)
console.log(producto.getProduct())

console.log("producto filtrado por id")
producto.getProductById(1)

















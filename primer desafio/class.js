// creo la clase
class productManager {
    
    // constructor(titulo, descripcion, precio, img, id, stock,) {
    //     this.titulo = titulo;
    //     this.descripcion = descripcion;
    //     this.precio = precio;
    //     this.img = img;
    //     this.id = id;
    //     this.stock = stock;
    // }

    // metodos
    // agregar un producto
    addProduct(titulo, descripcion, precio, img, id, stock,){
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.precio = precio;
        this.img = img;
        this.id = id;
        this.stock = stock;
    }

    // mostrar productos por consola
   getProducts() {
    return `estos son los productos: ${[this.titulo, this.descripcion, this.precio, this.img, this.id, this.stock]}`
   }
   
    //filtrar por id
    getProductsById() {
        return `este es el producto: ${this.titulo} , su id es: ${this.id}`
    }
} 


const producto = new productManager()
const producto1 = new productManager()
const producto3 = new productManager()

producto.addProduct("monitor", "monitor Asus 21'", "$50.000", "imagen", 3, 6)
console.log(producto.getProducts())
console.log(producto.getProductsById())

producto1.addProduct("mouse", "mouse logitech 10.000 dpi", "$5.000", "imagen", 1, 6)
console.log(producto1.getProducts())
console.log(producto1.getProductsById())

producto3.addProduct("teclado", "teclado logitech... etc", "$ 10.000", "imagen", 2, 3)
console.log(producto3.getProducts())
console.log(producto3.getProductsById())


















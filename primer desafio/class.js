class productManager {
    static globalId = 0

    constructor() {
        this.product = []
    }

    // metodos

    // agregar producto
    addProduct (titulo, descripcion, precio, img, code, stock) {
        if(!(titulo, descripcion, precio, img, code, stock)){
            console.log("falta informacion");
        }else if(this.product.find((prod) => prod.code === code)){
            console.log("codigo de producto ya existente")
        }else {
            const prodId = productManager.globalId++
            const prodAdd = {titulo, descripcion, precio, img, code, stock, prodId}
            this.product.push(prodAdd)
        }
        
    }

    // traer producto
    getProduct() {
        return this.product
    }

    // filtrar por id
    getProductById (id) {
        const filtrarPorId = this.product.find((prod) => prod.prodId === id)
        if(filtrarPorId){
            return filtrarPorId
        }else {
            console.log("el producto no se encuentra");
        }
    }
}


const producto = new productManager()

// array vacio
console.log(producto.getProduct());

// primer producto agregado
producto.addProduct("monitor", "monitor de 21' full hd", "$22144", "imagen", "abc123", 3);
console.log(producto.getProduct());

// segundo producto agregado
console.log("segundo push del item");
producto.addProduct("mouse", "mouse logitech 10000 dpi", "$5000", "imagen", "qwe123", 3);
console.log(producto.getProduct());

// filtrar por id
console.log("filtrando por id");
console.log(producto.getProductById(1));
// id no encontrado
// console.log(producto.getProductById(5));
















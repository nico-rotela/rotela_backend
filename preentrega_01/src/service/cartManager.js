import fs from 'fs'


class cartManager {
    static globalId = 0
    static quantity = 0
    constructor(path){
        this.products = []
        this.path = './files'
        this.fileName = this.path + '/jsonCarrito.json' 
    }

    // metodos

    // crear el directorio
    crearFiles = async () => {
        await fs.promises.mkdir(this.path, {recursive: true})
        // creo archivo vacio
        await fs.promises.writeFile(this.fileName, "[]")
    }

    // crear carrito
    addCart = async () => {
        try {
            const prodId = cartManager.globalId++
            const productAdd = {carrito:[], prodId}
            this.products.push(productAdd)
            await fs.promises.writeFile(this.fileName, JSON.stringify(this.products))
            console.log("se agrego el producto correctamente");
        } catch (error) {
            console.log('no se pudo crear el carrito');
        }
    }

    // cargar producto al carrito
    addProduct = async (cid,producto) => {
        let InfoJson = await fs.promises.readFile(this.fileName, 'utf-8')
        let infoParse = await JSON.parse(InfoJson)
        console.log(infoParse);
        // comparar cid
        const filtrarCarrito = infoParse.find((prod) => prod.prodId === cid)
        
        if(filtrarCarrito){
            const prodCart = producto          
            const indice = filtrarCarrito.carrito.findIndex((prod) => prod.id === producto.id)
            if(indice != -1){
                filtrarCarrito.carrito[indice].quantity = filtrarCarrito.carrito[indice].quantity + producto.quantity
            }else{
                filtrarCarrito.carrito.push(prodCart)
            }
        }else{
            console.log('error');
        }
        await fs.promises.writeFile(this.fileName, JSON.stringify([filtrarCarrito]))
        
    }

    


    // filtrar los carrito (cid)
    getCarrito = async (id) => {
        const InfoJson = await fs.promises.readFile(this.fileName, 'utf-8')
        const infoParse = await JSON.parse(InfoJson)

        const filtrarCarrito = infoParse.find((prod) => prod.prodId === id)
        console.log(filtrarCarrito);
        return filtrarCarrito ?? 'no se encontro el carrito'

    }

    
}

const carrito = new cartManager()


// carrito.addCart()
// carrito.getCarrito(1)
// carrito.addProduct(0, {producto:2,quantity:1})
// carrito.pushCar(0)

// carrito.crearFiles()
// carrito.addCart()
// carrito.addCart()
// console.log(carrito.crearCarrito('prodcuto'));
// console.log(carrito.crearCarrito('prodcuto1'));
// console.log(carrito.crearCarrito('prodcuto2'));

export default cartManager
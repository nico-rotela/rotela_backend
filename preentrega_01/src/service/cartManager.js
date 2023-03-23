import fs from 'fs'


class cartManager {
    static globalId = 0

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

    // // cargar producto al carrito
    addProduct = async (cid,producto) => {
        let InfoJson = await fs.promises.readFile(this.fileName, 'utf-8')
        let infoParse = await JSON.parse(InfoJson)
        console.log(cid,producto);
        // comparar cid
        let filtrarCarrito = infoParse.find((prod) => prod.prodId === cid)
        
        if(filtrarCarrito){
            const prodCart = producto[0]          
            const indice = filtrarCarrito.carrito.findIndex((prod) => prod.producto === producto[0].producto)
            console.log('este es el indice ', indice);
            if(indice != -1){
                filtrarCarrito.carrito[indice].quantity = filtrarCarrito.carrito[indice].quantity + producto[0].quantity
            }else{
                filtrarCarrito.carrito.push(prodCart)
                console.log('estoey en el else');
            }
        }else{
            filtrarCarrito = infoParse
            console.log('error en addproduct');
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

// carrito.crearProd("hola",123)
// carrito.agregarProductoAlcarrito(0,2,4)
// carrito.addCart()
// carrito.getCarrito(1)
// carrito.addProduct(0, {producto:2,quantity:1})

export default cartManager
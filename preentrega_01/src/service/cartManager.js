import fs from 'fs'


class cartManager {
    static globalId = 0
    constructor(path){
        this.products = []
        this.path = '../files'
        this.fileName = this.path + '/jsonCarrito.json' 
    }

    // metodos

    // crear el directorio
    crearFiles = async () => {
        await fs.promises.mkdir(this.path, {recursive: true})
        // creo archivo vacio
        await fs.promises.writeFile(this.fileName, "[]")
    }

    // agregamos el carrito
    addCart = async () => {
        try {
            const prodId = cartManager.globalId++
            const productAdd = {producto:'[]',prodId}
            this.products.push(productAdd)
            await fs.promises.writeFile(this.fileName, JSON.stringify(this.products))
            console.log("se agrego el producto correctamente");
        } catch (error) {
            console.log('no se pudo crear el carrito');
        }
    }
    

    getProduct = async () => {
        let InfoJson = await fs.promises.readFile(this.fileName, 'utf-8')
        let infoParse = await JSON.parse(InfoJson)
        return infoParse
    }

    getProductById = async () => {
        let info = await fs.promises.readFile(this.fileName, 'utf-8')
        let infoParse = await JSON.parse(info)

        const filtrarPorId = infoParse.find((prod) => prod.Pr)
    }
}

const carrito = new cartManager()
// carrito.crearFiles()
carrito.addCart()
carrito.addCart()
// console.log(carrito.crearCarrito('prodcuto'));
// console.log(carrito.crearCarrito('prodcuto1'));
// console.log(carrito.crearCarrito('prodcuto2'));

export default cartManager
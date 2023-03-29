import fs from 'fs'


class productManager {
    static globalId = 0

    constructor(path) {
        this.product = []
        this.path = './files'
        this.fileName = this.path + '/jsonProductos.json' 
    }

    // metodos

    // agregar producto
    addProduct = async (titulo, descripcion, precio, img, code, stock) => {
        // creo la carpeta
        await fs.promises.mkdir(this.path, { recursive: true })
        // agregar el producto
        if(!(titulo, descripcion, precio, img, code, stock)){
            console.log("falta informacion");
        }else if(this.product.find((prod) => prod.code === code)){
            console.log("codigo de producto ya existente")
        }else {
            const prodId = productManager.globalId++
            const prodAdd = {titulo, descripcion, precio, img, code, stock, prodId}
            this.product.push(prodAdd)
        }
        await fs.promises.writeFile(this.fileName, JSON.stringify(this.product))
        console.log("se agrego el producto correctamente");
    }

    // traer producto
    getProduct = async () => {
        let InfoJson = await fs.promises.readFile(this.fileName, 'utf-8')
        let infoParse = await JSON.parse(InfoJson)
        
        // console.log(infoParse);
        return infoParse;
        
    }

    // filtrar por id
    getProductById = async (id) => {
        let info = await fs.promises.readFile(this.fileName, 'utf-8')
        let infoParse = await JSON.parse(info)


        const filtrarPorId = infoParse.find((prod) => prod.prodId === id)
        
        return filtrarPorId ?? 'no se encontro el producto'

    }

    // borrar por id
    deleteProductById = async (id) => {
        let InfoJson = await fs.promises.readFile(this.fileName, 'utf-8')
        let infoParse = await JSON.parse(InfoJson)
    
        const nuevoArr = infoParse.filter(item => item.prodId !== id)
        await fs.promises.writeFile(this.fileName, JSON.stringify(nuevoArr))
        console.log(nuevoArr); 
    }

     
}

const producto = new productManager()

// producto.addProduct("monitor", "monitor de 21' full hd", "$22144", "imagen", "abc123", 3);
// producto.addProduct("mouse", "mouse logitech 10000 dpi", "$5000", "imagen", "qwe123", 3);
// producto.getProduct()
export default productManager
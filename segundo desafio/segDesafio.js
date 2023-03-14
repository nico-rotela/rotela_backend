const fs = require('fs')
const { dirname } = require('path')

class productManager {
    static globalId = 0

    constructor(path) {
        this.product = []
        this.path = path
        this.fileName = this.path + '/JSONProductos'
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
        
        console.log(infoParse);
        return infoParse;
        
    }

    // filtrar por id
    getProductById = async (id) => {
        let info = await fs.promises.readFile(this.fileName, 'utf-8')
        let infoParse = await JSON.parse(info)


        const filtrarPorId = infoParse.find((prod) => prod.prodId === id)
        
        return filtrarPorId ?? 'no se encontro el producto'

    }
    // modificar producto
    updateProductById = async (id, updatedData) => {
        let info = await fs.promises.readFile(this.fileName, 'utf-8')
        let infoParse = await JSON.parse(info)
    
        if (await this.getProductById(id)) {
          const newArr = parsedRes.map((item) => {
            return id == item.prodId ? { ...item, ...updatedData } : item
            console.log('Product updated succesfully')
          })
          await fs.promises.writeFile(this.filename, JSON.stringify(newArr))
        } else {
          console.log(`Product ID ${id} does not exist`)
        }
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


// const producto = new productManager()

// array vacio
// console.log(producto.getProduct());

// primer producto agregado
// producto.addProduct("monitor", "monitor de 21' full hd", "$22144", "imagen", "abc123", 3);
// producto.addProduct("monitorito", "monitor de 21' full hd", "$22144", "imagen", "ajc123", 3);

// segundo producto agregado
// console.log("segundo push del item");
// producto.addProduct("mouse", "mouse logitech 10000 dpi", "$5000", "imagen", "qwe123", 3);
// console.log(producto.getProduct());

// filtrar por id
// console.log("filtrando por id");
// console.log(producto.getProductById(1));
// producto.getProductById(0)
// // id no encontrado
// // console.log(producto.getProductById(5));


// borrar item
// console.log("borrando item");
// producto.deleteProductById(0)


module.exports = productManager
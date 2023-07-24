export const generateProductErrorInfo = (prod) => {
    return `una o mas propiedades fueron enviadas incompletas.
    propiedades requeridas:
    titulo recibido: ${prod.titulo}
    precio recibido: ${prod.precio}
    stock recibido: ${prod.stock}
    `
}

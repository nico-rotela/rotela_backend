import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;

const requester = supertest("http://localhost:8080");

describe("testing de productos" , () => {

    before(function () { 
        this.prodMock = {
            titulo: "producto prueba 1",
            precio: "1111",
            stock: "0000"
        }

    })
    describe("testing api de productos: getprod, addprod,", () => {

        // test 01 - agregar producto
        it("este test debe agregar un producto correctamente", async function () {

            // given
            console.log(this.prodMock);

            // then
            const {_code, ok, statusCode } = await requester.post('/api/productos/').send(this.prodMock)

            // assert that
            expect(statusCode).is.eql(201)
        })

        // comentar authorizaciones de usuario para este test '/api/prodviews/allproducts'
        it("este test debe traer los productos cargados en la base de datos", async function () {
    
            // test 01 - get de la base de datos
            // then
            const {_code, ok, statusCode } = await requester.get('/api/prodviews/allproducts')
    
            // assert that

            expect(statusCode).is.eql(200)
        })


    })


})
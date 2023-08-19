import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;

const requester = supertest("http://localhost:8080");



describe("test de carrito", () => {

    it("este test debe traer los productos cargados en la base de datos", async function () {
    
        // test 01 - get de la base de datos
        // then
        // comentar ( passportCall('jwt'),authorization("admin") ), desde el ruter si no falla el test 
        const {_code, ok, statusCode } = await requester.get('/api/carts')

        // assert that

        expect(statusCode).is.eql(200)
    })

})
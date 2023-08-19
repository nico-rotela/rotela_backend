import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;

const requester = supertest("http://localhost:8080");

describe("teasting users" , () => {

    before(function(){ //before global se debe usar el this
        this.cookie;
        this.mockUser = {
            first_name: "usuario de prueba 1",
            last_name: "apellido de prueba 1",
            email: "emailPrueba@gmail.com",
            age: "1",
            password: "123",
        }
    })

    // test 01
    it("este test debe registrar un usuario correctamente", async function () {

        // then
        const {_body, ok, statuscode } = await requester.post("/api/session/register").send(this.mockUser)

        // asser that
        expect(statuscode).is.equal(201)
    })
    

    // test 02 - login

    it("test de login: debe hacer login de un usuario creado anteriormente", async function () {
        // given
        const mockLogin = {
            email: this.mockUser.email,
            password: this.mockUser.password
        };

        // then
        const result = await requester.post('/api/jwt/login').send(mockLogin);
        const cookieResult = result.headers['set-cookie'][0];
        console.log(cookieResult);

        // assert thhat
        expect(result.statusCode).is.equal(200);

        const cookieData = cookieResult.split('=');
        this.cookie = {
            name: cookieData[0],
            value: cookieData[1]
        };

        expect(this.cookie.name).to.be.ok.and.eql('jwtCookieToken')
        expect(this.cookie.value).to.be.ok

    })
})
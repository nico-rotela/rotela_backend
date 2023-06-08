import passport from 'passport'
import passportLocal from 'passport-local'
import jwtStratergy from 'passport-jwt'
import githubStrategy from 'passport-github2'
import userModel from '../dao/models/userSchema.js'
import { createHash, isValidPassword } from '../utils.js'
import { PRIVATE_KEY } from '../utils.js'

// Declaro nuestra estrategia
const localStrategy = passportLocal.Strategy;

const JwtStrategy = jwtStratergy.Strategy;
const ExtractJWT = jwtStratergy.ExtractJwt;

const initializePassport = () => {

    // estrategia login con github
    passport.use('github', new githubStrategy({
        clientID: 'Iv1.ac69c037903aefbd',
        clientSecret: '64b818e989e58d6dd66679d4075e8d2554f3d558',
        callbackUrl: 'http://localhost:8080/api/session/githubcallback'
    },
    async(accessToken, refreshToken, profile, done)=>{
        console.log('profile obtenido del usuario');
        console.log(profile);

        try {
            const user = await userModel.findOne({email: profile._json.email})
            console.log("usuario encontrado para login");
            console.log(user);

            if(!user){
                console.warn("User doesn't exists with username: " + profile._json.email);
                    let newUser = {
                        first_name: profile._json.name,
                        last_name: '',
                        age: 18,
                        email: profile._json.email,
                        password: '',
                        loggedBy: "GitHub"
                    };
                    const result = await userModel.create(newUser);
                    return done(null, result);
            }else{
                return done(null, user)
            }

        } catch (error) {
            return done(error)
        }
    })
    )

    // estrategia register
    passport.use('register', new localStrategy(
        // passReqToCallback: para convertirlo en un callback de request, para asi poder iteractuar con la data que viene del cliente
        // usernameField: renombramos el username
        { passReqToCallback: true, usernameField: 'email' },

        async(req, username, password, done) =>{
            const { first_name, last_name, email, age } = req.body;
            try {

                const exists = await userModel.findOne({ email });
                if (exists) {
                    console.log("El usuario ya existe.");
                    return done(null, false);
                }
                const user = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password)
                };
                const result = await userModel.create(user);
                //Todo sale OK
                return done(null, result);
            } catch (error) {
                return done("Error registrando el usuario: " + error);
            }
        }

    ))

    // estrategia login
    passport.use('login', new localStrategy(
        { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
            try {
                const user = await userModel.findOne({ email: username });
                console.log("(desde passport) Usuario encontrado para login:");
                console.log(user);
                if (!user) {
                    console.warn("User doesn't exists with username: " + username);
                    return done(null, false);
                }
                if (!isValidPassword(user, password)) {
                    console.warn("Invalid credentials for user: " + username);
                    return done(null, false);
                }
                console.log('return del user', user);
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        })
    );

        
    // JWT CON COOKIES

     //Estrategia de obtener Token JWT por Cookie:
     passport.use('jwt', new JwtStrategy(
        // extraer la  cookie
        {
            jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
            secretOrKey: PRIVATE_KEY
        },
        // Ambiente Async
        async(jwt_payload, done)=>{
            console.log("Entrando a passport Strategy con JWT.");
            try {
                console.log("JWT obtenido del payload");
                console.log(jwt_payload);
                return done(null, jwt_payload.user)
            } catch (error) {
                console.error(error);
                return done(error);
            }
        }
    ));


    //Funciones de Serializacion y Desserializacion
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await userModel.findById(id);
            done(null, user);
        } catch (error) {
            console.error("Error deserializando el usuario: " + error);
        }
    });
}

// Funcion para hacer la extraccion de la cookie
const cookieExtractor = req =>{
    let token = null;
    console.log("Entrando a cookie extractor");
    if(req && req.cookies){ //Validamos que exista el request y las cookies.
       console.log("Cooikies presentes!");
       console.log(req.cookies);
       token = req.cookies['jwtCookieToken'];
       console.log("token obtenido desde cookie");
       console.log(token);
    }
    return token;
}


export default initializePassport
import passport from 'passport';
import passportLocal from 'passport-local';
import userModel from '../models/user.model.js';
import { createHash, isValidPassword } from '../utils.js'


//Declaramos nuestra estrategia:
const localStrategy = passportLocal.Strategy




/* metodo main 

    initializePassport(

        // defino estrategia de login y register

        // metodos de serializacion/ des-serializacion 
    )
*/


/**
 * Función para inicializar Passport y definir las estrategias de autenticación.
 */
const initializePassport = () => {



    // Register
    passport.use('register', new localStrategy(/**
         * 📌 Estrategia de Registro de Usuarios
         * Utilizamos 'register' como identificador de esta estrategia.
         */
        {
            passReqToCallback: true, // Permite acceder al objeto `req` dentro de la función de autenticación
            usernameField: 'email' // Definimos que el "username" será el campo "email"
        },

        /**
         * 📌 Callback de autenticación
         * Recibe el request, el username (email), la contraseña y la función `done`
         */
        async (req, username, password, done) => {
            try {
                const { first_name, last_name, email, age } = req.body; // Extraemos datos del request

                const exists = await userModel.findOne({ email });
                if (exists) {
                    console.log("El usuario ya existe.");
                    return done(null, false); // Retorna `false` indicando que la autenticación falló
                }

                // Creamos un nuevo usuario con la contraseña encriptada
                const user = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password)
                };

                // Guardamos el usuario en la base de datos
                const result = await userModel.create(user);


                // todo salio bien 
                return done(null, result)

            } catch (error) {
                return done("Error registrando user", error)
            }


        }

    ))



    // Login 
    passport.use('login', new localStrategy(/**
         * 📌 Estrategia de Registro de Usuarios
         * Utilizamos 'register' como identificador de esta estrategia.
         */
        {
            passReqToCallback: true, // Permite acceder al objeto `req` dentro de la función de autenticación
            usernameField: 'email' // Definimos que el "username" será el campo "email"
        },

        /**
         * 📌 Callback de autenticación
         * Recibe el request, el username (email), la contraseña y la función `done`
         */
        async (req, username, password, done) => {
            try {


                const user = await userModel.findOne({ email: username });
                console.log("Usuario encontrado para login: ", user);

                // Si el usuario no existe, retornamos error
                if (!user) {
                    console.warn("User doesn't exists with username: " + username);
                    return done(null, false);
                }


                // Validamos la contraseña
                if (!isValidPassword(user.password, password)) {
                    console.warn("Invalid credentials for user: " + username);
                    return done(null, false);
                }


                console.log('ANTES del done FINAL');

                return done(null, user)

            } catch (error) {
                return done("Error login user", error)
            }
        }

    ))




    // metodos de serializacion/ des-serializacion 


    /**
    * 📌 Serialización del Usuario
    * Se ejecuta después de una autenticación exitosa.
    * Passport almacena solo el `user._id` en la sesión en lugar de todo el objeto usuario.
    */
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })



    /**
   * 📌 Deserialización del Usuario
   * Cuando se hacen solicitudes autenticadas, Passport busca al usuario en la base de datos
   * usando el `id` guardado en la sesión.
   */
    passport.deserializeUser(async (id, done) => {
        try {
            let user = await userModel.findById(id)
            done(null, user)
        } catch (error) {
            console.error("Error deserializando el usuario: " + error);
        }
    })

}


export default initializePassport

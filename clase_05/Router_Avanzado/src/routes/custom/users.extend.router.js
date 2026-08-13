import CustomRouter from './custom.router.js';
import UserService from '../../services/db/users.service.js';
import { createHash, isValidPassword, generateJWToken } from '../../utils.js';

export default class UsersExtendRouter extends CustomRouter {
    init() {
        const userService = new UserService();


        // APIs

        //Aqui se declaran los routers, equivalente a router.get
        this.get("/", ["PUBLIC"], (req, res) => {
            // res.send("Hola Coders!");
            res.sendSuccess("Hola Coders!");
        });


        //Aqui se declaran los routers, equivalente a router.get
        this.get("/admin", ["ADMIN"], (req, res) => {
            // res.send("Hola Coders!");
            res.sendSuccess("Hola Admin!");
        });


        //Aqui se declaran los routers, equivalente a router.get
        this.get("/test", ["ADMIN", "USER"], (req, res) => {
            // res.send("Hola Coders!");
            res.sendSuccess("Hola Test!");
        });



        this.post("/register", ["PUBLIC"], async (req, res) => {
            try {
                const { first_name, last_name, email, age, password, role } = req.body;

                // Validar que el usuario no exista
                const userExists = await userService.findByUsername(email);
                if (userExists) {
                    return res.sendUserExistsError("User already exists.");
                }

                // Crear el usuario
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password),
                    role: role,
                    loggedBy: "form",
                };
                const createdUser = await userService.save(newUser);
                res.sendSuccess(createdUser);
            } catch (error) {
                res.sendInternalServerError(error);
            }
        })


        this.post("/login", ["PUBLIC"], async (req, res) => {
            try {
                const { email, password } = req.body;

                // Validar que el usuario exista
                const user = await userService.findByUsername(email);
                if (!user) {
                    return res.sendUnauthorizedError("User not found.");
                }

                // Validar la contraseña
                if (!isValidPassword(user, password)) {
                    return res.sendUnauthorizedError("Invalid password.");
                }


                // DTO
                const userDTO = {
                    name: `${user.first_name} ${user.last_name}`,
                    email: user.email,
                    age: user.age,
                    role: user.role,
                };

                // Generar el token JWT
                const token = generateJWToken(userDTO);

                // Devolver el token al cliente
                res.sendSuccess({ token });
            } catch (error) {
                res.sendInternalServerError(error);
            }
        })

    }
};
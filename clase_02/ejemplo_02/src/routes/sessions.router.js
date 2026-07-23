import { Router } from 'express'
import userModel from '../models/user.model.js';


const router = Router()
// API Register
// POST /api/users
router.post("/register", async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;
        //validar parametros
        if (!first_name || !last_name || !email) {
            return res.status(400).json({ error: "Missing required fields" });
        }


        // buscamos en la DB si el user existe
        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.status(400).send({ status: "error", message: "Usuario ya existe." })
        }


        // DTO
        const newUser = {
            first_name,
            last_name,
            email,
            age,
            password // <-- Se debe encriptar
        };

        // Create the user in the database
        const createdUser = await userModel.create(newUser);


        console.log("createdUser:::", createdUser)


        // Send the created user as a response
        res.status(201).json({ result: "success", message: "User creado con exito con ID:" + createdUser._id });
    } catch (error) {
        console.error("Error creating users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})


// API Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // buscamos en la DB si el user existe
        const user = await userModel.findOne({ email, password })
        if (!user) {
            return res.status(400).send({ status: "error", message: "credenciales incorrectas" })
        }


        // creamos la sesion del user
        req.session.user = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age
        }

        res.send({ status: "success", payload: req.session.user, message: "¡Primer logueo realizado! :)" });
    } catch (error) {
        console.error("Error creating users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})


export default router;
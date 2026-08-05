import { Router } from 'express';
import passport from 'passport';
import { generateJWToken, isValidPassword } from '../utils.js'
import userModel from '../models/user.model.js';

const router = Router();

router.get("/github", passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => { });

router.get("/githubcallback", passport.authenticate('github', { failureRedirect: '/github/error' }), async (req, res) => {
    const user = req.user;
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    };
    req.session.admin = true;
    res.redirect("/users");
});



router.post("/register", passport.authenticate(
    'register', { session: false, failureRedirect: '/api/sessions/fail-register' })
    , async (req, res) => {
        console.log("Registrando nuevo usuario.");
        res.status(201).send({ status: "success", message: "Usuario creado con extito." });
    });

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).send({ status: "error", message: "Usuario no encontrado." });
        }

        if (!isValidPassword(user, password)) {
            return res.status(401).send({ status: "error", message: "Contraseña incorrecta." });
        }


        // DTO
        const userDTO = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age,
            role: user.role
        }


        // usando JWT
        const access_token = generateJWToken(userDTO);
        console.log("JWT Generado: ", access_token);



        // Guardando el token en una cookie
        // httpOnly: true //No se expone la cookie
        // httpOnly: false //Si se expone la cookie
        res.cookie('jwtCookieToken', access_token, { maxAge: 60 * 60 * 1000, httpOnly: true }).send({ status: "success", message: "Login success!" });
    } catch (error) {
        console.error("Error en login: ", error);
        res.status(500).send({ status: "error", message: "Internal server error." });
    }

});

router.get("/fail-register", (req, res) => {
    res.status(401).send({ error: "Failed to process register!" });
});

router.get("/fail-login", (req, res) => {
    res.status(401).send({ error: "Failed to process login!" });
});

export default router;
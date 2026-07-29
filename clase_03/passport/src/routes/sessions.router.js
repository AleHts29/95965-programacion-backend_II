import { Router } from 'express'
import userModel from '../models/user.model.js';
import { createHash, isValidPassword } from '../utils.js'
import passport from 'passport';

const router = Router()
// API Register
// POST /api/users
router.post("/register", passport.authenticate('register', { failureRedirect: '/api/sessions/fail-register' }), async (req, res) => {
    console.log("Registrando nuevo User - Passport")

    // Send the created user as a response
    res.status(201).json({ result: "success", message: "User creado con exito" });

})


// API Login
router.post("/login", passport.authenticate('login', { failureRedirect: '/api/sessions/fail-login' }), async (req, res) => {
    try {

        const user = req.user

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



router.get("/fail-register", (req, res) => {
    res.status(401).send({ error: "Failed to process register!" });
});

router.get("/fail-login", (req, res) => {
    res.status(401).send({ error: "Failed to process login!" });
});

export default router;
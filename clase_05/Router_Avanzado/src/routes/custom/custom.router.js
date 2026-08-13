import { Router } from "express";
import jwt from "jsonwebtoken";
import { PRIVATE_KEY } from "../../utils.js";

export default class CustomRouter {
    constructor() {
        this.router = Router();
        this.init();
    };


    getRouter() {
        return this.router;
    }

    init() { }; // Método que debe ser implementado por las clases hijas


    // GET, POST, PUT, DELETE
    get(path, policies, ...callbacks) {
        this.router.get(
            path,
            this.handlePolicies(policies),
            this.generateCustomResponses,
            this.applyCallbacks(callbacks)
        )
    }

    post(path, policies, ...callbacks) {
        this.router.post(
            path,
            this.handlePolicies(policies),
            this.generateCustomResponses,
            this.applyCallbacks(callbacks)
        )
    }


    put(path, policies, ...callbacks) {
        this.router.put(
            path,
            this.handlePolicies(policies),
            this.generateCustomResponses,
            this.applyCallbacks(callbacks)
        )
    }

    delete(path, policies, ...callbacks) {
        this.router.delete(
            path,
            this.handlePolicies(policies),
            this.generateCustomResponses,
            this.applyCallbacks(callbacks)
        )
    }


    // Metodos Auxiliares
    handlePolicies = policies => (req, res, next) => {
        console.log("Policies: ", policies);

        if (policies[0] === "PUBLIC") return next();


        // Validaciones del rol del usuario
        // Obtenemos el JWT
        const token = req.headers.authorization?.replace('Bearer ', '');


        // Validamos el JWT
        if (!token) {
            console.log("Token no presente en el header de autorización.");
            return res.status(401).send('Unauthorized');
        }

        try {
            console.log("Token presente en el header de autorización: ", token);

            jwt.verify(token, PRIVATE_KEY, (error, decoded) => {
                if (error) {
                    console.log("Error al verificar el token: ", error);
                    return res.status(403).send('Forbidden');
                }
                console.log("Token verificado correctamente. Decoded: ", decoded);


                const user = decoded.user;


                // Validamos el rol del usuario sea el correcto
                if (!policies.includes(user.role.toUpperCase())) {
                    return res.status(403).send('Forbidden');
                }

                next();
            });

        } catch (error) {
            return res.status(401).send('Unauthorized');
        }

    }


    generateCustomResponses = (req, res, next) => {
        //Custom responses 
        res.sendSuccess = payload => res.status(200).send({ status: "Success", payload });
        res.sendInternalServerError = error => res.status(500).send({ status: "Error", error });
        res.sendClientError = error => res.status(400).send({ status: "Client Error, Bad request from client.", error });
        res.sendUserExistsError = error => res.status(400).send({ status: "Client Error, User already exists.", error });
        res.sendUnauthorizedError = error => res.status(401).send({ error: "User not authenticated or missing token." });
        res.sendForbiddenError = error => res.status(403).send({ error: "Token invalid or user with no access, Unauthorized please check your roles!" });
        next();
    }

    // [M1, M2, async (req, res) => { }]
    applyCallbacks(callbacks) {
        return callbacks.map((callback) => async (...params) => {
            try {
                await callback.apply(this, params);
            } catch (error) {
                console.log("Error en applyCallbacks: ", error);
                params[1].status(500).send({ status: "Error", error: "Internal Server Error" });
            }
        })
    }

}








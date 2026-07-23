import { Router } from "express";
import cookieParser from "cookie-parser";

const router = Router();


// sin firma 
// router.use(cookieParser())


// con firma
router.use(cookieParser("CoderS3cr3tC0d3"))



router.get('/', (req, res) => {
    res.render('index', {});
});



router.get('/setCookie', (req, res) => {
    // sin firma
    // res.cookie("coderCookie", "Esta es una cookie sin firma", { maxAge: 300000 }).send({ status: "success", message: "Cookie set" });

    // con firma
    res.cookie("coderCookie", "Esta es una cookie con firma", { maxAge: 300000, signed: true }).send({ status: "success", message: "Cookie set" });
})


router.get('/getCookie', (req, res) => {
    // sin firma
    // res.send({ status: "success", message: req.cookies })


    // con firma
    res.send({ status: "success", message: req.signedCookies })
})


router.get('/deleteCookie', (req, res) => {
    // sin firma
    res.clearCookie("coderCookie").send({ status: "success", message: "delete cookie" })
})





/*=============================================
=                   2da Parte                 =
=============================================*/
router.get("/session", (req, res) => {
    if (req.session.counter) {
        // Usted ha visitado la web N veces
        req.session.counter++
        res.send(`Se ha visitado este sitio ${req.session.counter} veces.`);
    } else {
        req.session.counter = 1;
        res.send("Bienvenido!!")
    }
})




router.get("/login", (req, res) => {
    const { username, password } = req.query;
    if (username !== 'pepe' || password !== 'qwerty123') {
        return res.status(401).send("Login Failed, check your credentials.");
    } else {
        req.session.user = username;
        req.session.admin = true;
        res.send("Login Successful!!")
    }
})

router.get("/logout", (req, res) => {
    req.session.destroy(error => {
        res.json({ error: "error logout", message: "Error al cerrar la session" })
    })

    res.send("Sesion cerrada correctamente!!")
})


function auth(req, res, next) {
    if (req.session.user === 'pepe' && req.session.admin) {
        return next()
    } else {
        return res.status(403).send("Usuario no autorizado!!")
    }
}



router.get("/private", auth, (req, res) => {
    res.send("Si estas viendo esta informacion es porque sos ADMIN y por ende tenes una session activa")
})



export default router;
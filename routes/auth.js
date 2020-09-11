/*
 endpoint = /api/auth + route
*/

const { Router } = require("express");
const router = Router();
const { register, login, renew } = require("../app/controllers/AuthController");
const validateJWT = require("../app/middleware/validateJWT");

router.put("/register",register);

router.post("/login",login);

router.get("/renew", validateJWT, renew);



module.exports = router;

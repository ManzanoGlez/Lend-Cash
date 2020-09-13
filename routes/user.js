/*
 endpoint = /api/auth + route
*/

const { Router } = require("express");
const router = Router();
const { show } = require("../app/controllers/UserController");
const validateJWT = require("../app/middleware/validateJWT");

router.use(validateJWT);

router.get("/", show);

module.exports = router;

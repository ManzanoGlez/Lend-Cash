/*
 endpoint = /api/ + route
*/

const { Router } = require("express");
const router = Router();

router.use("/auth", require("./auth"));
router.use("/users", require("./user"));

module.exports = router;

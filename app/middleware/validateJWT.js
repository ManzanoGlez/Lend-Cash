const { response } = require("express");
const jwt = require("jsonwebtoken");

const validateJWT = (req, res = response, next) => {
    try {
        
        const token = req.header("Authorization");

        if (!token) {
            return res.status(401).json({
                message: "Unauthenticated",
            });
        }

        const payload = jwt.verify(token, process.env.SEED);

        req.auth_user = payload;       

    } catch (error) {
        console.log(error);

        return res.status(401).json({
            message: "Unauthenticated",
        });
    }

     next();
};



module.exports =  validateJWT;

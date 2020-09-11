const jwt = require("jsonwebtoken");

const generateJWT = (user) => {
    return new Promise((resolve, reject) => {

        const payload = {
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            telephone: user.telephone,
            img: user.img,
        };

        jwt.sign(payload,process.env.SEED,
            {
                expiresIn: "72h",
            },
            (err, token) => {
                if (err) {
                    console.warn(err);
                    reject("No se logro generar el token");
                } else {
                    resolve(token);
                }
            }
        );
    });
};

module.exports = { generateJWT };

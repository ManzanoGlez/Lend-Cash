const bcrypt = require("bcryptjs");
const { response } = require("express");
const { generateJWT } = require("../helpers/jwt");
const useValidate = require("../hooks/useValidate");
const { User } = require("../../database/models");

const register = async (req, res = response) => {
    const results = await useValidate(req.body, {
        name: "required",
        lastName: "required",
        email: ["required", "email", `unique:User`],
        telephone: ["required", "string", "size:10"],
        password: "required",
        confirm_password: ["required", "same:password"],
    });
    if (!results.isFine()) {
        return res.status(422).json({ ok: false, error: results.errors });
    }

    try {
        const password = bcrypt.hashSync(
            req.body.password,
            bcrypt.genSaltSync()
        );

        const user = await User.create({ ...req.body, password });

        const access_token = await generateJWT(user);

        delete user.password;

        return res.status(201).json({
            success: {
                user,
                access_token,
            },
        });
    } catch (error) {
        console.warn(error);
        return res.status(500).json({
            ok: false,
            msg: "Ha ocurrido un error, en breve lo soluciónaremos",
        });
    }
};

const login = async (req, res = response) => {
    try {
        const results = await useValidate(req.body, {
            email: ["required", "email"],
            password: ["required", "string"],
        });
        if (!results.isFine()) {
            return res.status(422).json({ ok: false, error: results.errors });
        }

        const { password, email } = req.body;

        const user = await User.findOne({where: { email }});

        if (user) {
            if (await bcrypt.compareSync(password, user.password)) {

                const access_token = await generateJWT(user);

                return res.json({
                    success: {
                        user,
                        access_token,
                    },
                });
            }
        }

        return res.status(400).json({
            ok: false,
            msg: "Usuario/contraseña incorrecta",
        });
        
    } catch (error) {
        console.warn(error);
        return res.status(500).json({
            ok: false,
            msg: "Ha ocurrido un error, en breve lo soluciónaremos",
        });
    }
};

const renew = async (req, res = response) => {

    const access_token = await generateJWT(req.auth_user);
    return res.json({ ok: true, user: req.auth_user, access_token });
};

module.exports = {
    register,
    login,
    renew,
};

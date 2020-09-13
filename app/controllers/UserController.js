const { response } = require("express");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");
const useValidate = require("../hooks/useValidate");

const { User } = require("../../database/models");
const usePaginator = require("../hooks/usePaginate");
const { Op } = require("sequelize");

const show = async (req, res = response) => {
    const { q } = req.query;

    const users = await usePaginator(User, 5, req, {
        where: {
            [Op.or]: {
                name: { [Op.substring]: q },
                lastName: { [Op.substring]: q },
                email: { [Op.substring]: q },
                telephone: { [Op.substring]: q },
            },
        },
    });

    return res.json({ success: { users } });
};

module.exports = { show };

"use strict";
const Validator = require("validatorjs");
const words = require("../../config/lang/es_lang_words.json");
const { sequelize } = require("../../database/models");
const { setAttributeFormatter } = require("validatorjs");

Validator.useLang("es");

Validator.setAttributeFormatter((attribute) => {
    return attribute.replace(/_/g, " ");
});

const customMsg = {
    same: {
        string: "El campo confirmar contraseña y :same deben coincidir.",
    },
};

const getTraduction = (wordToFind) => {
    return Object.entries(words).find((key) => key[0] === wordToFind)[1];
};

Validator.registerAsync("unique", async (value, args, attribute, passes) => {
    const resp = await sequelize.models[args].count({
        where: {
            [attribute]: value,
        },
        limit: 1,
    });

    if (resp === 0) {
        passes();
    } else {
        passes(
            false,
            `El campo ${getTraduction(attribute)} ya ha sido registrado.`
        );
    }
});

Validator.registerAsync("exists", async (value, args, attribute, passes) => {
    const resp = await sequelize.models[args].count({
        where: {
            [attribute]: value,
        },
        limit: 1,
    });

    if (resp === 0) {
        passes(false, `${getTraduction(attribute)} no ha sido registrado.`);
    } else {
        passes();
    }
});

const useValidate = async (data, rules) => {
    const validator = new Validator(data, rules, customMsg);

    validator.setAttributeNames(words);

    return await getResults(validator);
};

const getResults = async (validator) => {
    return await new Promise((resolve) => {
        validator.fails(() => {
            resolve({
                isFine: () => false,
                errors: validator.errors.all(),
            });
        });
        validator.passes(() => {
            resolve({
                isFine: () => true,
                errors: {},
            });
        });
    });
};

module.exports = useValidate;

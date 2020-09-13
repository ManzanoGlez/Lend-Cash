const express = require("express");
const formData = require("express-form-data");
const os = require("os");
const cors_config = require("./cors");
const dotenv = require("dotenv");
dotenv.config();

const loadConfig = (app) => {
    //To READ data
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use(formData.parse({ uploadDir: os.tmpdir(), autoClean: true }));
    app.use(formData.format());
    app.use(formData.stream());
    app.use(formData.union());

    cors_config(app);

    validateDotEnv();
};

const validateDotEnv = () => {
    if (!process.env.PORT) {
      throw new Error(".env -  missing param 'PORT', (port where will run this app)");
    }
    if (!process.env.SEED) {
      throw new Error(".env -  missing param 'SEED', (seed is required by JTW) by example: '$pwk(V1yX-UrviXqX2;f@Sq3R$9d0kFd)q8orgj'");
    }

};

module.exports = { loadConfig };

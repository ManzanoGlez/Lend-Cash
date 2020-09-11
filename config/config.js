const express = require("express");
const formData = require("express-form-data");
const os = require("os");
const cors_config = require("./cors");
 
require("dotenv").config();

const loadConfig = (app) => {
    //To READ data
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use(formData.parse({ uploadDir: os.tmpdir(), autoClean: true }));
    app.use(formData.format());
    app.use(formData.stream());
    app.use(formData.union());

    cors_config(app);
};



module.exports = { loadConfig };
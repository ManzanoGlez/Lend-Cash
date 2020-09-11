const express = require("express");
const app = express();

const {loadConfig} = require("./config/config");

app.use(express.static("public"));

loadConfig(app);

app.use("/api", require("./routes/api"));

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto: ${process.env.PORT}`);
    console.log(`---------------------------------`);
    console.log("Abra aqui con CTRL o CMD + click:");
    console.log(`---------------------------------`);
    console.log(`http://localhost:${process.env.PORT}/`);
    console.log(`---------------------------------`);
});

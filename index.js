const express = require("express");
const conexionDB = require("./db/config");
var cors = require('cors');
const authRouter = require("./routees/auth");
const taskRouter = require("./routees/tareas");

const app = express();
require("dotenv").config();

const corsOptions ={
    "/api/*": {
        "target": "http://localhost:3000",
        "secure": false,
        "logLevel": "debug"
}
}
app.use(cors(corsOptions));

conexionDB();

app.use(express.json());

app.use("/", express.static(__dirname + "/public"));

app.use("/auth", authRouter);

app.use("/task", taskRouter);

app.listen(process.env.PORT, () => {
    console.log(`Aplicacion corriendo por el puerto ${process.env.PORT}`);
});

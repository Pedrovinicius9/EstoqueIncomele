const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require("./database/database");

//Import dos controllers
const pescocoConstroller = require("./pescocos/PescocosController");
const luminariaController = require("./luminarias/LuminariasController");

const Pescoco = require("./pescocos/Pescoco");
const Luminaria = require("./luminarias/Luminaria");

//View engine
app.set('view engine', 'ejs');

//Static
app.use(express.static('public'));

//body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//database
connection
    .authenticate()
    .then(() => {
        console.log("Conexao estabelecida com sucesso!");
    }).catch((error) => {
        console.log(error);
    });

app.use("/", pescocoConstroller);
app.use("/", luminariaController);

app.get("/" ,(req, res) => {
    res.render("index");
});

app.listen(8080, () => {
    console.log("Servidor rodando na porta 8080!");
});
const Sequelize = require("sequelize");
const connection = require("../database/database");

const Luminaria = connection.define('luminarias', {
    estado: {
        type: Sequelize.STRING, 
        allowNull: false
    },modelo: {
        type: Sequelize.STRING,
        allowNull: false
    }, qntd: {
        type: Sequelize.INTEGER,
        allowNull: false
    }, date: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

//Luminaria.sync({force: true});

module.exports = Luminaria;
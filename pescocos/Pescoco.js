const Sequelize = require("sequelize");
const connection = require("../database/database");

const Pescoco = connection.define('pescocos', {
    estado: {
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

//Pescoco.sync({force: true});

module.exports = Pescoco;
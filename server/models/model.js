const sequelize = require('../db');
const {Sequelize} = require("sequelize");

const User = sequelize.define("user", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    registration: {
        type: Sequelize.STRING,
        allowNull: false
    },
    authorization: {
        type: Sequelize.STRING,
        defaultValue: "not authorized",
        allowNull: false
    },
    block: {
        type: Sequelize.STRING,
        defaultValue: "Unblock",
        allowNull: false
    }
});

module.exports = {User};
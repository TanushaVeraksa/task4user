require('dotenv').config();
const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'freedb_userDB1234',
    'freedb_user7',
    'N5CTz&TXwPH4MR6',
    {
        dialect: 'mysql',
        host: 'sql.freedb.tech',
    }
);

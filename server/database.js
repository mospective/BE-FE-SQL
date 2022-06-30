const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('test-db', 'testusermo', '1Qazxdr5', {
    dialect: 'sqlite',
    host: './server/dev.sqlite'
});

module.exports = sequelize;
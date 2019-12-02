
const Sequelize = require('sequelize')
const path = require('path')

const sequelizeConfig = {
    database: 'mock',
    user: 'mason',
    password: 'mason',

}

const db = new Sequelize(sequelizeConfig.database, sequelizeConfig.user, sequelizeConfig.password, {
    dialect: 'sqlite',
    sync: { force: true },
    storage: path.resolve(__dirname, './', 'db/app.sqlite')
})


db
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.')
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err)
    })

module.exports = db


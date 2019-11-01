const mongoose = require('mongoose')
const { name } = require('../config/keys').db
module.exports = {
    open () {
        return mongoose.connect(name, { useNewUrlParser: true }).then(() => {
            console.log('数据库连接成功！')
        })
    },
    close () {
        return mongoose.connection.close()
    }
}

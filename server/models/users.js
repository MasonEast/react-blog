const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: +Date.now()
    }
});

const Users = mongoose.model('User', UserSchema);


// 查询
function query (obj = {}) {
    return new Promise((resolve, reject) => {
        Users.find(obj, (err, res) => {
            if (err) {
                reject(err)
            }
            resolve(res)
        })
    })
}
function queryEmail (em) {
    return new Promise((resolve, reject) => {
        Users.find({ email: em }, (err, res) => {
            if (err) {
                reject(err)
            }
            const len = res.length
            if (len >= 1) {
                // 存在
                resolve(res)
            } else {
                // 不存在
                resolve(null)
            }
        })
    })
}
// 保存
function save (obj) {
    const m = new Users(obj)
    return new Promise((resolve, reject) => {
        m.save((err, res) => {
            if (err) {
                reject(err)
            }
            resolve(res)
            console.log(res)
        })
    })

}

module.exports = {
    query,
    queryEmail,
    save
}
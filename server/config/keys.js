const env = process.env
const appKey = env.APP_KET || 'default key'
const appSecret = env.APP_SECRET || 'default secret'
const nodeEnv = env.NODE_ENV
let db = {
    name: 'mongodb://localhost:27017/mason',
    user: 'user',
    password: 'pass'
}
if (nodeEnv === 'production') {
    db = {
        name: 'mongodb://127.0.0.1:27017/xcx',
        user: 'user',
        password: 'pass'
    }
}

module.exports = {
    appKey,
    appSecret,
    db
}
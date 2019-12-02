const Koa = require('koa')
const cors = require('koa-cors')
const bodyParser = require('koa-bodyparser')
const koaBody = require('koa-body');
const db = require('./db')
const router = require('./route')
const Koa_Session = require('koa-session');

const app = new Koa()

//解除跨域限制， 这里用于demo， 这样做是不安全的
app.use(cors({
    origin: '*'
}))

//解析post请求的中间件
app.use(bodyParser());

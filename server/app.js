const Koa = require('koa')
const cors = require('koa-cors')
const bodyParser = require('koa-bodyparser')
const koaBody = require('koa-body');
const path = require('path')
const { open } = require('./db')
const router = require('./route')

//实例化koa
const app = new Koa();

app.use(cors({
    origin: '*'
}))
app.use(bodyParser());


//文件上传
app.use(koaBody({
    multipart: true,
    strict: false,//设为false，为了得到delete参数
    formidable: {
        maxFileSize: 200 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
    }
}));

//连接数据库
open()

//配置路由
app.use(router.routes()).use(router.allowedMethods())


const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`port running at ${port}....`)
})
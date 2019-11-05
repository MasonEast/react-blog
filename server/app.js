const Koa = require('koa')
const cors = require('koa-cors')
const bodyParser = require('koa-bodyparser')
const koaBody = require('koa-body');
const { open } = require('./db')
const router = require('./route')
const Koa_Session = require('koa-session');

//实例化koa
const app = new Koa();

//解除跨域限制， 这里用于demo， 这样做是不安全的
app.use(cors({
    origin: '*'
}))

//解析post请求的中间件
app.use(bodyParser());

const session_signed_key = ["some secret hurr"];  // 这个是配合signed属性的签名key
const session_config = {
    key: 'koa:sess', /**  cookie的key。 (默认是 koa:sess) */
    maxAge: 4000,   /**  session 过期时间，以毫秒ms为单位计算 。*/
    autoCommit: true, /** 自动提交到响应头。(默认是 true) */
    overwrite: true, /** 是否允许重写 。(默认是 true) */
    httpOnly: true, /** 是否设置HttpOnly，如果在Cookie中设置了"HttpOnly"属性，那么通过程序(JS脚本、Applet等)将无法读取到Cookie信息，这样能有效的防止XSS攻击。  (默认 true) */
    signed: true, /** 是否签名。(默认是 true) */
    rolling: true, /** 是否每次响应时刷新Session的有效期。(默认是 false) */
    renew: false, /** 是否在Session快过期时刷新Session的有效期。(默认是 false) */
};
// 实例化
const session = Koa_Session(session_config, app)
app.keys = session_signed_key;

// 使用中间件，注意有先后顺序
app.use(session);


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





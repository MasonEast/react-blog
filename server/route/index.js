const Router = require('koa-router')
const fs = require('fs')
const path = require('path')
const router = new Router()
const blog = require('../models/blog')
const user = require('../models/users')
const responseOK = require('../middlewares/responseOk')

/**
 * 获取blog列表
 */
router.get('/blog', async (context, next) => {
    console.log(context.request)
    console.log(context.params)
    let queryId = context.request.query.id
    if (queryId) {
        const item = await blog.getBlog(queryId)
        context.body = {
            data: item,
            status: 0
        }
        return
    }
    const blogs = await blog.getBlogs()
    context.body = {
        data: blogs,
        status: 0
    }
})

/**
 * 添加blog
 */
router.post('/blog', async (ctx, next) => {
    console.log('post', ctx.request.query)
    const { title, author, content, tags } = ctx.request.query
    await blog.add(title, author, content, tags)
    await next()
}, responseOK)

/**
 * 删除blog
 */
router.delete('/blog/:id', async (context, next) => {
    console.log('delete', context.request.query)

    await blog.deleteBlog(context.request.query.id)
    context.body = {
        status: 0
    }
})

/**
 * 登录
 */
router.post('/login', async (ctx) => {

    if (!ctx.session.logged) {  // 如果登录属性为undefined或者false，对应未登录和登录失败
        // 设置登录属性为false
        ctx.session.logged = false;

        // 取请求url解析后的参数对象，方便比对
        // 如?nickname=post修改&passwd=123解析为{nickname:"post修改",passwd:"123"}
        const data = ctx.request.body
        // 判断用户名密码是否为空
        if (data.email && data.password) {
            const queryEmail = await user.queryEmail(data.email)

            // 比对并分情况返回结果  
            if (queryEmail) {  // 如果存在该用户名

                // 进行密码比对并返回结果 
                if (queryEmail[0].password === data.password) {
                    ctx.session.logged = true;
                    ctx.body = {
                        status: 0,
                        data: queryEmail[0],
                        msg: '登录成功'
                    }
                } else {
                    ctx.body = {
                        status: 1,
                        data: {},
                        msg: '密码错误'
                    }
                }


            } else {                    // 如果不存在该用户名                                          
                ctx.body = {
                    status: 2,
                    data: {},
                    msg: '没有该用户，去注册吧'
                }
            }
        } else {
            ctx.body = "用户名密码不能为空";
        }
    } else {
        ctx.body = {
            status: 0,
            msg: "已登录"
        };
    }
})

/**
 * 注册
 */
router.post('/register', async (ctx) => {
    const data = ctx.request.body
    console.log(data)
    let queryres = await user.queryEmail(data.email)
    if (queryres) {
        ctx.body = {
            status: 1,
            data: {},
            msg: '该邮箱已经存在哦'
        }
    } else {
        await user.save(data)
        ctx.body = {
            status: 0,
            data: {},
            msg: '保存成功'
        }
    }

})

module.exports = router



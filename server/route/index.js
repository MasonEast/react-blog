const Router = require('koa-router')
const fs = require('fs')
const path = require('path')
const router = new Router()
const blog = require('../db/blog')
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
    const { title, author, content } = ctx.request.body
    await blog.add(title, author, content)
    await next()
}, responseOK)

/**
 * 删除blog
 */
router.delete('/blog', async (context, next) => {
    console.log(context.request.body)

    await blog.deleteBlog(context.request.body.id)
    context.body = {
        status: 0
    }
})

module.exports = router
const Router = require('koa-router')
const fs = require('fs')
const path = require('path')
const router = new Router()
const blog = require('../models/blog')
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

module.exports = router
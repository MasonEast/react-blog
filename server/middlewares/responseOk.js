module.exports = async function responseOK (ctx, next) {
    ctx.body = {
        status: 0
    }
    await next()
}
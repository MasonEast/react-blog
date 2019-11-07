module.exports = async function responseOK (ctx, next) {
    ctx.body = {
        status: 0,
        data: {},
        msg: ' It‘s sunccess! '
    }
    await next()
}
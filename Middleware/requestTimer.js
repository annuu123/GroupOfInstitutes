module.exports = (req, res, next) => {
    const start = Date.now()
    res.on('finish', () => {
        const duration = Date.now() - start
        console.log(`Request ${req.method} ${req.url} took ${duration}ms`)
    })
    next()
}

module.exports = (req, res, next) => {
    if (req.headers['x-authenticated-user']) {
        next() // Proceed if authenticated
    } else {
        res.status(401).send('Unauthorized - Please Login')
    }
}

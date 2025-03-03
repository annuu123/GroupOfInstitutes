const isMaintenanceMode = false  // Set to true to enable

module.exports = (req, res, next) => {
    if (isMaintenanceMode) {
        res.status(503).send('Site is under maintenance. Please try again later.')
    } else {
        next()
    }
}

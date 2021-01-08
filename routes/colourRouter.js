const router = require('express').Router()
const closestMatch = require('../controllers/controller')

router.route('/sendRGB').post((req, res) => {
    const rgb = req.body.rgb
    const rgbSim = closestMatch(rgb)
    res.send(rgbSim)
})

module.exports = router
const Router = require('express')
const router = new Router()

const operatorRouter = require('./operatorRouter')
const playlistRouter = require('./playlistRouter')
const devicesRouter = require('./devicesRouter')

router.use('/operator', operatorRouter)
router.use('/playlist', playlistRouter)
router.use('/devices', devicesRouter)

module.exports = router
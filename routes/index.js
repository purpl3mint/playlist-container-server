const Router = require('express')
const router = new Router()

const operatorRouter = require('./operatorRouter')
const playlistRouter = require('./playlistRouter')
const devicesRouter = require('./devicesRouter')
const showRouter = require('./showRouter')

router.use('/operator', operatorRouter)
router.use('/playlist', playlistRouter)
router.use('/devices', devicesRouter)
router.use('/show', showRouter)

module.exports = router
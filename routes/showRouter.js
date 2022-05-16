const Router = require('express')
const router = new Router()
const showController = require('../controllers/showController')

router.get("/:groupname", showController.getCurrentPlaylist)

module.exports = router
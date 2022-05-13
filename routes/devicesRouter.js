const Router = require('express')
const router = new Router()
const devicesController = require('../controllers/devicesController')

router.post('/', devicesController.createDevices)
router.get('/', devicesController.getDevices)
router.delete('/:id', devicesController.deleteDevices)

router.post('/playlist', devicesController.addPlaylist)
router.get('/playlist/:id', devicesController.getPlaylistsForDevices)
router.delete('/playlist/:idDevices/:idSchedule', devicesController.deletePlaylist)

module.exports = router
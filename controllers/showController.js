const { Devices } = require('../models/models')
const ApiError = require('../error/apiError')

class ShowController {
    async getCurrentPlaylist(req, res, next) {
        const {groupname} = req.params

        const group = await Devices.findOne({where: {name: groupname}})

        if (!group)
            return next(ApiError.badRequest("Такой группы устройств не обнаружено"))
        else {
            const playlists = await group.getPlaylists()
            
            if (playlists.length === 1) {
                let file = require('./../static/' + playlists[0].url)

                return res.send(file)
            }
            else if (playlists.length > 1) {
                const date = new Date()
                const formattedDate = date.toTimeString().split(' ')[0]
                for(let i = 0; i < playlists.length; i++) {
                    if (playlists[i].schedule.timeStart < formattedDate && playlists[i].schedule.timeEnd > formattedDate) {
                        let file = require('./../static/' + playlists[i].url)
                        return res.send(file)
                    }
                }
            }

            return res.json(playlists)
        }
    }
}

module.exports = new ShowController()
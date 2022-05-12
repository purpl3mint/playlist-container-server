const {Devices, Playlist} = require('../models/models')
const ApiError = require('../error/apiError')

class DevicesController {
    async createDevices(req, res, next) {
        const {name, url} = req.body

        const candidateByName = await Devices.findOne({where: {name}})
        if (candidateByName)
            return next(ApiError.badRequest("Такая группа устройств уже существует"))

        const candidateByUrl = await Devices.findOne({where: {url}})
        if (candidateByUrl)
            return next(ApiError.badRequest("URL уже занят, задайте другой"))

        const createdDevices = await Devices.create({ name, url })

        if (createdDevices)
            return res.json({message: "Группа устройств успешно создана"})
        else
            return next(ApiError.badRequest("Не удалось создать группу устройств"))
    }

    async getDevices(req, res, next) {
        const devices = await Devices.findAll()

        return res.json(devices)
    }

    async deleteDevices(req, res, next) {
        const {id} = req.params

        const deletedDevices = await Devices.destroy({where: {id}})

        if (deletedDevices)
            return res.json({message: "Группа устройств удалена"})
        else
            return next(ApiError.badRequest("Группу устройств не удалось удалить"))
    }

    async addPlaylist(req, res, next) {
        const {idDevices, idPlaylist, timeStart, timeEnd} = req.body

        const devices = await Devices.findByPk(idDevices)
        if (!devices)
            return next(ApiError.badRequest("Такой группы устройств не существует"))
            
        const playlist = await Playlist.findByPk(idPlaylist)
        if (!playlist)
            return next(ApiError.badRequest("Такого меидаплана не существует"))


        const succeedAdd = await devices.addPlaylist(playlist, {through: {timeStart, timeEnd}})

        if (succeedAdd)
            return res.json({message: "Плейлист успешно добавлен к группе устройств"})
        else
            return next(ApiError.badRequest("Плейлист не удалось добавить к группе устройств"))
    }

    async getPlaylistsForDevices(req, res, next) {
        const {id} = req.body

        const devices= await Devices.findByPk(id)
        const playlists = await devices.getPlaylists()

        if (playlists)
            return res.json(playlists)
        else
            return next(ApiError.badRequest("Плейлистов для группы устройств не найдено"))
    }

    async deletePlaylist(req, res, next) {
        const {idDevices, idSchedule} = req.params

        const devices= await Devices.findByPk(idDevices)
        const playlists = await devices.getPlaylists()

        for (let playlist of playlists) {
            if (playlist.schedule.id === (idSchedule-0)){
                const succeedDelete = await playlist.schedule.destroy()

                if (succeedDelete)
                    return res.json({message: "Плейлист успешно удален из группы устройств"})
                else
                    return next(ApiError.badRequest("Плейлист не удалось удалить"))
            }
        }

        return res.json({message: "Плейлист в группе устройств не найден"})
    }
}

module.exports = new DevicesController()
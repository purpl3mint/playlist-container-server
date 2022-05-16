const uuid = require('uuid')
const path = require('path')
const { unlink } = require('fs')
const {Playlist} = require('../models/models')

class PlaylistController {
    async create(req, res, next) {
        const {name} = req.body
        const {file} = req.files
        const url = name + '-' + uuid.v4() + '.json'
        if (file) {
            file.mv(path.resolve(__dirname, '..', 'static', url))
        }

        const playlistCreated = await Playlist.create({
            name,
            url
        })

        if (playlistCreated) {
            return res.json({message: "Плейлист успешно создан"})
        } else {
            return next(ApiError.badRequest('Не удалось создать плейлист'))
        }
    }

    async getAll(req, res, next) {
        const playlists = await Playlist.findAll()

        return res.json(playlists)
    }

    async delete(req, res, next) {
        const {id} = req.params

        const deletePlaylist = await Playlist.destroy({where: {id}})

        if (deletePlaylist)
            return res.json({message: "Плейлист успешно удален"})
        else 
            return next(ApiError.badRequest('Не удалось удалить плейлист'))
    }
}

module.exports = new PlaylistController()
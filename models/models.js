const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Operator = sequelize.define('operator', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING, require: true},
})

const Playlist = sequelize.define('playlist', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
    url: {type: DataTypes.STRING, unique: true},
})

const Devices = sequelize.define('devices', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
    url: {type: DataTypes.STRING, unique: true},
})

const Schedule = sequelize.define('schedule', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    devicesId: {type: DataTypes.INTEGER, require: true},
    playlistId: {type: DataTypes.INTEGER, require: true},
    timeStart: {type: DataTypes.TIME, require: true},
    timeEnd: {type: DataTypes.TIME, require: true},
})

Operator.hasMany(Playlist)
Playlist.belongsTo(Operator)

Playlist.belongsToMany(Devices, { through: Schedule, as: 'PlaylistInSchedule', foreignKey: 'playlistId' })
Devices.belongsToMany(Playlist, { through: Schedule, as: 'DevicesInSchedule', foreignKey: 'devicesId' })

module.exports = {
    Operator,
    Playlist,
    Devices,
    Schedule
}
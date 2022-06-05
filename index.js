const express = require('express')
const config = require('config')
const bcrypt = require('bcrypt')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/errorHandlingMiddleware')
const path = require('path')
const { model } = require('./db')

const app = express()
app.use(cors())
app.use(express.json())
app.use(fileUpload({}))
app.use('/api', router)

//Static files
app.use("/stat", express.static(path.resolve(__dirname, 'static')))

//For production environment
if (process.env.NODE_ENV === 'production') {
  app.get("/stat/:file", (req, res) => {
    res.sendFile(path.join(__dirname + '/static/' + req.params.file));
  })
  app.use("/", express.static('client/build'));
  app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname + '/client/build/index.html'));
  });

}

const PORT = config.get('port') || 8080


app.get('/', (req, res) => {
    res.status(200).json({message: 'Hi'})
})


const seed = async () => {
    const { count, rows } = await models.Operator.findAndCountAll()
  
    if (count === 0) {
        const hashPassword = await bcrypt.hash('password', 5)
        await models.Operator.create({
            login: 'admin',
            password: hashPassword
        })
    }
  
}

const start = async () => {
    try {
      //UNCOMMENT ONLY AFTER INITIALIZING CREDENTIALS IN CONFIG FOR DB
      await sequelize.authenticate()
      await sequelize.sync()
      await seed()
      app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
      console.log(e);
      throw e;
    }
}

start()
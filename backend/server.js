const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const session = require('express-session')

dotenv.config()

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.nxuqm.mongodb.net/mydatabase?retryWrites=true&w=majority`
mongoose
  .connect(uri)
  .then(() => console.log('Успешно подключено к MongoDB'))
  .catch((err) => console.error('Ошибка подключения к MongoDB:', err))

const app = express()

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'default_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
)

app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))

app.get('/', (_, res) => {
  res.send('Добро пожаловать на сервер!')
})

const authRouter = require('./routes/auth')
const saveDataRouter = require('./routes/resultsCard')
app.use('/auth', authRouter)
app.use('/user', saveDataRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Сервер запущен на http://localhost:${PORT}`))

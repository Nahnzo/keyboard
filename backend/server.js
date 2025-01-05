const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const session = require('express-session')

dotenv.config()

// Подключение к MongoDB
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.nxuqm.mongodb.net/mydatabase?retryWrites=true&w=majority`
mongoose
  .connect(uri)
  .then(() => console.log('Успешно подключено к MongoDB'))
  .catch((err) => console.error('Ошибка подключения к MongoDB:', err))

const app = express()

// Настройка сессий
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'default_secret_key', // Секретный ключ
    resave: false, // Не пересоздавать сессии, если они не были изменены
    saveUninitialized: false, // Не сохранять пустые сессии
    cookie: { secure: true },
  })
)

// Middleware
app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))

// Маршруты
app.get('/', (req, res) => {
  res.send('Добро пожаловать на сервер!')
})

const authRouter = require('./routes/auth')
app.use('/auth', authRouter)

// Запуск сервера
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Сервер запущен на http://localhost:${PORT}`))

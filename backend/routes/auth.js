const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const router = express.Router()

// Регистрация
router.post('/register', async (req, res) => {
  const { username, password, email } = req.body

  if (!password) {
    return res.status(400).json({ message: 'Пароль обязателен' })
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({ username, password: hashedPassword, email })
    await user.save()

    res.status(201).json({ message: 'Пользователь успешно зарегистрирован' })
  } catch (error) {
    res.status(500).json({ message: 'Ошибка регистрации', error: error.message })
  }
})

// Логин
router.post('/login', async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })
    if (!user) return res.status(400).json({ message: 'Пользователь не найден' })

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) return res.status(400).json({ message: 'Неверный пароль' })

    // Устанавливаем сессию для пользователя
    req.session.userId = user._id // Сохраняем ID пользователя в сессии
    req.session.username = user.username // Сохраняем имя пользователя в сессии

    res.json({ message: `Добро пожаловать, ${user.username}` })
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error })
  }
})

// Логаут
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Ошибка при завершении сессии' })
    }

    res.clearCookie('connect.sid') // Удаляем cookie сессии
    return res.status(200).json({ message: 'Выход выполнен успешно' })
  })
})

// // Защищённый маршрут, который требует аутентификации
// router.get('/profile', (req, res) => {
//   if (!req.session.userId) {
//     return res.status(401).json({ message: 'Не авторизован' })
//   }

//   // Получаем пользователя из базы данных по ID из сессии
//   User.findById(req.session.userId)
//     .then((user) => {
//       if (!user) {
//         return res.status(404).json({ message: 'Пользователь не найден' })
//       }
//       res.json({ username: user.username, email: user.email })
//     })
//     .catch((error) => {
//       res.status(500).json({ message: 'Ошибка сервера', error })
//     })
// })

module.exports = router

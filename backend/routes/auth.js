const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const router = express.Router()

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

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(400).json({ message: 'Неверный логин или пароль' })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Неверный логин или пароль' })
    }
    req.session.userId = user._id
    req.session.username = user.username
    res.json({
      isAuth: true,
      username: user.username,
      userId: user._id,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Ошибка сервера', error: error.message })
  }
})

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Ошибка при завершении сессии' })
    }

    res.clearCookie('connect.sid')
    return res.status(200).json({ message: 'Выход выполнен успешно' })
  })
})

router.get('/me', (req, res) => {
  if (req.session.userId) {
    res.json({
      isAuth: true,
      username: req.session.username,
    })
  } else {
    res.status(401).json({ isAuth: false, message: 'Сессия истекла' })
  }
})

module.exports = router

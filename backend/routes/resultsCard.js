const ResultCard = require('../models/resultCard')
const express = require('express')

const router = express.Router()

router.post('/saveResultsCard', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Пользователь не авторизован' })
  }
  const { seconds, accuracy, wordsPerMinute, charactersPerMinute, created_At } = req.body
  try {
    const resultsCard = new ResultCard({
      seconds,
      accuracy,
      wordsPerMinute,
      charactersPerMinute,
      created_At,
      userId: req.session.userId,
    })
    await resultsCard.save()
    res.status(201).json({ message: 'Данные успешно сохранены' })
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сохранения результата', error: error.message })
  }
})

router.get('/loadResultsCard', async (req, res) => {
  const userId = req.session.userId

  if (!userId) {
    return res.status(401).json({ message: 'Пользователь не авторизован' })
  }

  try {
    const resultsCards = await ResultCard.find({ userId })
    if (!resultsCards || resultsCards.length === 0) {
      return res.status(404).json({ message: 'Нет данных для этого пользователя' })
    }

    res.status(200).json(resultsCards)
  } catch (error) {
    res.status(500).json({ message: 'Ошибка загрузки данных', error: error.message })
  }
})

module.exports = router

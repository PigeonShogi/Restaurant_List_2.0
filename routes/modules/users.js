const bcrypt = require('bcryptjs')
const express = require('express')
const Restaurant = require('../../models/restaurant')

const router = express.Router()


router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  res.render('register')
})

module.exports = router
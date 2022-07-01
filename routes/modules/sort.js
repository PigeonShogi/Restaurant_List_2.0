const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/nameAse', (req, res) => {
  Restaurant.find().lean().sort({ name: 'asc' })
    .then(restaurants => {
      console.log(restaurants)
      res.render('index', { restaurants })
    })
    .catch(error => { console.log(error) })
})

router.get('/nameDesc', (req, res) => {
  Restaurant.find().lean().sort({ name: 'desc' })
    .then(restaurants => {
      console.log(restaurants)
      res.render('index', { restaurants })
    })
    .catch(error => { console.log(error) })
})

router.get('/category', (req, res) => {
  Restaurant.find().lean().sort({ category: 'desc' })
    .then(restaurants => {
      console.log(restaurants)
      res.render('index', { restaurants })
    })
    .catch(error => { console.log(error) })
})

router.get('/location', (req, res) => {
  Restaurant.find().lean().sort({ location: 'desc' })
    .then(restaurants => {
      console.log(restaurants)
      res.render('index', { restaurants })
    })
    .catch(error => { console.log(error) })
})

module.exports = router
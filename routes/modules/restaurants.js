const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/new', (req, res) => {
  res.render('add')
})

router.get('/:_id', (req, res) => {
  const restaurantId = req.params._id
  Restaurant.findById(restaurantId).lean()
    .then(restaurant => {
      res.render('show', { restaurant, restaurantId })
    })
})

router.get('/:_id/edit', (req, res) => {
  const id = req.params._id
  Restaurant.findById(id).lean()
    .then(restaurant => {
      res.render('edit', ({ restaurant }))
    })
})

router.post('/new', (req, res) => {
  const name = req.body.name
  const nameEn = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const googleMap = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description

  return Restaurant.create({ name, nameEn, category, image, location, phone, googleMap, rating, description })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})


router.put('/:_id', (req, res) => {
  const _id = req.params._id
  const name = req.body.name
  const nameEn = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const googleMap = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description

  return Restaurant.findById(_id)
    .then(restaurant => {
      restaurant.name = name
      restaurant.name_en = nameEn
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = googleMap
      restaurant.rating = rating
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => {
      console.log(error)
      res.render('errorPage', ({ error: error.message }))
    }
    )
})

router.delete('/:_id', (req, res) => {
  const id = req.params._id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
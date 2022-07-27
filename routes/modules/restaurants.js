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

  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})


router.put('/:_id', (req, res) => {
  const _id = req.params._id
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body

  return Restaurant.findById(_id)
    .then(restaurant => {
      // restaurant.name = name
      // restaurant.name_en = name_en
      // restaurant.category = category
      // restaurant.image = image
      // restaurant.location = location
      // restaurant.phone = phone
      // restaurant.google_map = google_map
      // restaurant.rating = rating
      // restaurant.description = description
      restaurant = Object.assign(restaurant, req.body) // 使用 Object.assign，相當於撰寫以上幾行註解的內容。
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => {
      console.log(error)
      res.render('errorPage', ({ error: error.message }))
    })
})

router.delete('/:_id', (req, res) => {
  const id = req.params._id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
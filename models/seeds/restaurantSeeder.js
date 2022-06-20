const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurantsJSON = require('D:/4_GitHub/restaurant_list/restaurant.json')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  restaurantsJSON.results.forEach(element => {
    Restaurant.create({
      id: element.id,
      name: element.name,
      name_en: element.name_en,
      category: element.category,
      image: element.image,
      location: element.location,
      phone: element.phone,
      google_map: element.google_map,
      rating: element.rating,
      description: element.description,
    })
  })
  console.log('done')
})
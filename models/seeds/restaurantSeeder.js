const Restaurant = require('../restaurant')
const restaurantsJSON = require('../../restaurant.json').results
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connected!')
  Restaurant.create(restaurantsJSON)
    .then(() => console.log('Restaurant Seeder Done!'))
    .catch(err => console.log(err))
    .finally(() => db.close())
})
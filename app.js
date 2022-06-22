const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

const Restaurant = require('./models/restaurant')
const RestaurantLean = Restaurant.find().lean()

// const restaurantList = require('./restaurant.json') // 引進資料庫後就不需仰賴 JSON 檔，完工後可刪除此行。

const app = express()
const port = 3000

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  RestaurantLean
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

app.get('/restaurants/:id', (req, res) => {
  const restaurantId = req.params.id
  RestaurantLean
    .then(restaurants => {
      const restaurant = restaurants.find(element => {
        return element.id.toString() === restaurantId
      })
      res.render('show', { restaurant })
    })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  RestaurantLean
    .then(restaurant => {
      const searchedRestaurants = restaurant.filter(element => {
        return element.name.toLowerCase().includes(keyword) ||
          element.name_en.toLowerCase().includes(keyword) ||
          element.category.toLowerCase().includes(keyword)
      })
      if (searchedRestaurants.length === 0) {
        res.render('no_result', { keyword: keyword })
      } else {
        res.render('index', { restaurants: searchedRestaurants, keyword: keyword })
      }
    }
    )
})

app.get('/new_restaurant', (req, res) => {
  res.render('add')
})

app.post('/new_restaurant_form', (req, res) => {
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

app.listen(port, () => {
  console.log('伺服器監聽中')
})
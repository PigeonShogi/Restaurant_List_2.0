const express = require('express')
const exphbs = require('express-handlebars')

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

app.listen(port, () => {
  console.log('伺服器監聽中')
})
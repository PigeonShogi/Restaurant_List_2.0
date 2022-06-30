const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

const Restaurant = require('./models/restaurant')

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
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  Restaurant.find().lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

app.get('/restaurants/:_id', (req, res) => {
  const restaurantId = req.params._id
  Restaurant.findById(restaurantId).lean()
    .then(restaurant => {
      res.render('show', { restaurant, restaurantId })
    })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword

  Restaurant.find().lean()
    .then(restaurant => {
      const searchedRestaurants = restaurant.filter((element) => {
        return element.name.toLowerCase().includes(keyword.toLowerCase())
        // || element.name_en.toLowerCase().includes(keyword.toLowerCase())
        // || element.category.toLowerCase().includes(keyword.toLowerCase())
        // 以上兩行會導致搜尋功能癱瘓，但花了許多時間仍不知該如何解決問題，不想因此耽誤其他學習，因此暫且設定為註解。上一版本的搜尋功能可以用關鍵詞比對餐廳名稱、英文名稱、類型，但是這一版本不行。上一版的搜尋對象是JSON檔，這一版的搜尋對象是從資料庫擷取後的檔案。不知道是不是這個原因導致上一版可行的程式碼在這一版會出錯。
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

app.get('/restaurants/:_id/edit', (req, res) => {
  const id = req.params._id
  Restaurant.findById(id).lean()
    .then(restaurant => {
      res.render('edit', ({ restaurant }))
    })
})

app.put('/restaurants/:_id', (req, res) => {
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

app.delete('/restaurant/:_id', (req, res) => {
  const id = req.params._id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log('餐廳清單伺服器監聽中')
})
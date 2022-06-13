const express = require('express')
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', (req, res) => {
  const restaurants = restaurantList.results
  res.render('index', { restaurants: restaurants })
})

app.get('/restaurants/:id', (req, res) => {
  const restaurantId = req.params.id
  const restaurant = restaurantList.results.find(element => {
    return element.id.toString() === restaurantId
  })
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  const searchedRestaurants = restaurantList.results.filter(element => {
    return element.name.toLowerCase().includes(keyword) ||
      element.name_en.toLowerCase().includes(keyword) ||
      element.category.toLowerCase().includes(keyword)
  })
  if (searchedRestaurants.length === 0) {
    const restaurants = restaurantList.results
    res.render('no_result', { keyword: keyword })
  } else {
    res.render('index', { restaurants: searchedRestaurants, keyword: keyword })
  }

})

app.listen(port, () => {
  console.log('伺服器監聽中')
})
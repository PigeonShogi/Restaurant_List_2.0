const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
// const Restaurant = require('./models/restaurant')
const routes = require('./routes')
require('dotenv').config()
require('./config/mongoose')

const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false })) // true 才是正確，當初為何 false 也能用？
app.use(methodOverride('_method'))
app.use(routes)

app.listen(port, () => {
  console.log('餐廳清單伺服器監聽中')
})
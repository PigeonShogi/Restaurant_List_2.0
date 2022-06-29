const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurantsJSON = require('../../restaurant.json')
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
  console.log('Restaurant Seeder Done!')
  // .then(() => console.log('Restaurant Seeder Done!')) 
  // .catch(err => console.log(err)) 
  // .finally(() => db.close()) 
  /*
  曾按助教建議，嘗試加上面三行程式碼，但 git bash 會回報以下錯誤。
  因為教案裡找不到助教補充給我的內容，所以我也很難確認到底是自己編碼有問題還是怎的。
  麻煩助教幫我解惑。可以的話請直接修改我的程式碼，以便我比對自己錯在哪裡，謝謝。
  
  D:\4_github\restaurant_list\models\seeds\restaurantSeeder.js:28
  .then(() => console.log('Restaurant Seeder Done!'))
  ^

TypeError: Cannot read property 'then' of undefined
    at NativeConnection.<anonymous> (D:\4_github\restaurant_list\models\seeds\restaurantSeeder.js:28:3)
    at Object.onceWrapper (events.js:421:28)
    at NativeConnection.emit (events.js:315:20)
    at NativeConnection.Connection.onOpen (D:\4_github\restaurant_list\node_modules\mongoose\lib\connection.js:646:8)
    at _setClient (D:\4_github\restaurant_list\node_modules\mongoose\lib\connection.js:999:8)
    at D:\4_github\restaurant_list\node_modules\mongoose\lib\connection.js:841:7
    at D:\4_github\restaurant_list\node_modules\mongodb\lib\utils.js:704:5
    at D:\4_github\restaurant_list\node_modules\mongodb\lib\mongo_client.js:286:7
    at connectCallback (D:\4_github\restaurant_list\node_modules\mongodb\lib\operations\connect.js:367:5)
    at D:\4_github\restaurant_list\node_modules\mongodb\lib\operations\connect.js:557:5
    at connectHandler (D:\4_github\restaurant_list\node_modules\mongodb\lib\core\sdam\topology.js:298:43)
    at cb (D:\4_github\restaurant_list\node_modules\mongodb\lib\core\sdam\topology.js:690:26)
    at D:\4_github\restaurant_list\node_modules\mongodb\lib\cmap\connection_pool.js:352:13
    at handleOperationResult (D:\4_github\restaurant_list\node_modules\mongodb\lib\core\sdam\server.js:567:5)
    at MessageStream.messageHandler (D:\4_github\restaurant_list\node_modules\mongodb\lib\cmap\connection.js:308:5)
    at MessageStream.emit (events.js:315:20)

  */
})
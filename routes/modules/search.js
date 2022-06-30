const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('', (req, res) => {
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

module.exports = router
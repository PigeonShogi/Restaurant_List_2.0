const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  id: {
    type: number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  done: {
    type: Boolean
  }
})
module.exports = mongoose.model('Restaurant', restaurantSchema)


/* 參考資料
      "id": 1,
      "name": "Sababa 沙巴巴中東美食",
      "name_en": "Sababa Pita Bar",
      "category": "中東料理",
      "image": "https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5635/01.jpg",
      "location": "台北市羅斯福路三段 283 巷 17 號",
      "phone": "02 2363 8009",
      "google_map": "https://goo.gl/maps/BJdmLuVdDbw",
      "rating": 4.1,
      "description":
*/ 
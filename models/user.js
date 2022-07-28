const mongoose = require('mongoose')
const { Schema } = mongoose
// mongoose 官方文件採用上一行的寫法，等同於教案中的寫法： const Schema  = mongoose.Schema
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('User', userSchema) // mongoose.model(modelName, schema)
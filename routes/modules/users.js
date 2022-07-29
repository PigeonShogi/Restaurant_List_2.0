const bcrypt = require('bcryptjs')
const express = require('express')
const passport = require('passport')
const Restaurant = require('../../models/restaurant')

const router = express.Router()


router.get('/login', (req, res) => {
  res.render('login')
})


/*
1. 在 npm 找到 passport 官方文件：https://www.npmjs.com/package/passport
2. 尋找標題「Authenticate Requests」
3. 引用範例程式碼，並應需求調整。
*/
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  console.log('註冊資料 === ', name, email, password, confirmPassword)
  return bcrypt.genSalt() // 加鹽，複雜度 10 時可不填入引數
    .then(salt => bcrypt.hash(password, salt))
    .then(saltedPassword => console.log(saltedPassword))
    .then(() => res.render('login'))
    .catch(err => console.log(err))
  /*
  1. 進入說明文件：https://www.npmjs.com/package/bcryptjs#security-considerations
  2. 搜尋：hash(s, salt, callback, progressCallback=)
  3. 可知：參數 s 的類型為字串，表示要雜湊的對象。
     salt的類型為數字或字串，類型為數字時，表示產生多少長度的 salt；
     類型為字串時，表示在雜湊後添增的 salt。
  */

})

module.exports = router
const express = require('express')
const router = express.Router()
const passport = require('passport')
// const Restaurant = require('../../models/restaurant') 不需要？
const User = require('../../models/user')
const bcrypt = require('bcryptjs')

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

router.get('/logout', (req, res) => {
  /* 
  1. 前往 passport 官方文件：https://www.passportjs.org/tutorials/password/logout/
  2. 找到標題「Log Out」
  3. 引用範例語法，並應需求修改。
  */
  req.logout()
  req.flash('success_msg', '你已經登出系統')
  res.redirect('/users/login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  console.log('註冊資料 === ', name, email, password, confirmPassword)
  const errors = []
  if (!email || !password || !confirmPassword) {
    errors.push({ message: '除了姓名，所有欄位都是必填' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不一致！' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  // 從 User 資料庫中的 email 屬性尋找是否有值與 email 相符的資料
  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.push({ message: '您輸入的 Email 已有註冊記錄' })
        return res.render('register', {
          errors,
          name,
          email,
          password,
          confirmPassword
        })
      }
      return bcrypt
        .genSalt(10) // 加鹽，複雜度 10 時可不填入引數
        .then(salt => bcrypt.hash(password, salt))
        /*
        1. 進入說明文件：https://www.npmjs.com/package/bcryptjs#security-considerations
        2. 搜尋：hash(s, salt, callback, progressCallback=)
        3. 可知：參數 s 的類型為字串，表示要雜湊的對象。
           salt的類型為數字或字串，類型為數字時，表示產生多少長度的 salt；
           類型為字串時，表示在雜湊後添增的 salt。
        */
        .then(hash => User.create({
          name,
          email,
          password: hash,
        }))
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
})
module.exports = router
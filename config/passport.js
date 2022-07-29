const passport = require('passport')
const LocalStrategy = require('passport-local')

module.exports = app => {
  /*
  初始化 Passport 模組
  1. 在 npm 找到 passport 的官方文件  https://www.npmjs.com/package/passport
  2. 搜尋 Middleware
  3. 可知：app.use(passport.initialize())
     app.use(passport.session())
     是必要的編碼。
  */
  app.use(passport.initialize())
  app.use(passport.session())
  /*
  設定本地登入策略
  1. 找到官方文件：https://www.passportjs.org/packages/passport-local/
  2. 將官方範例複製並依照需求調整編碼（例如改用箭頭函式、Promise語法等）
  3. Field 的相關說明見 GitHub 官方文件：https://github.com/jaredhanson/passport-local#parameters
  */
  passport.use(new LocalStrategy(
    { usernameField: 'email' }, (username, password, done) => {
      User.findOne({ email })
        .then(user => {
          if (!user) {
            return done(null, false, { message: '這個電郵位址尚未註冊' })
          }
          if (user.password !== password) {
            return done(null, false, { message: '電郵位址或密碼不正確' })
          }
          return done(null, user)
        })
        .catch(err => (done(err, false)))
    }))

  /*
  設定序列化與反序列化
  1. 找到官方文件：https://www.npmjs.com/package/passport
  2. 尋找標題「Sessions」
  3. 找到範例編碼
  */
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}


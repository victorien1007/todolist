var express = require('express')
var path = require('path')
// var favicon = require('serve-favicon');
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var multer = require('multer')
var mongoose = require('mongoose')
var session = require('express-session')
var routes = require('./routes/index')
var users = require('./routes/users')
var todo = require('./routes/todolist')

var router = express.Router()
router.post('/upload', multer().single('file'), function (req, res) {
  console.log(req.file)
  console.log(req.body)
})
module.exports = router

global.dbHandel = require('./database/dbHandel')
global.db = mongoose.connect('mongodb://admin:admin@ds213229.mlab.com:13229/signin')
var app = express()
app.use(session({
  resave: false, // 添加 resave 选项
  saveUninitialized: true, // 添加 saveUninitialized 选项
  secret: 'secret',
  cookie: {
    maxAge: 1000 * 60 * 30
  }
}))
// view engine setup
app.use(express.static(path.join(__dirname, 'public')))
app.engine('html', require('ejs').__express)// or   app.engine("html",require("ejs").renderFile);
app.set('views', path.join(__dirname, 'views'))
// app.set("view engine","ejs")
app.set('view engine', 'html')

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(multer());
app.use(cookieParser())

app.use(function (req, res, next) {
  res.locals.user = req.session.user
  var err = req.session.error
  delete req.session.error
  res.locals.message = ''
  if (err) {
    res.locals.message = '<div class="alert alert-danger" style="margin-bottom:20px;color:red;">' + err + '</div>'
  }
  next()
})
// 设置路由

app.use('/', routes)
app.use('/users', users)
app.use('/login', routes)
app.use('/register', routes)
app.use('/home', todo)
app.use('/logout', routes)
app.use('/todolist', todo)
app.use('/add', todo)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})
module.exports = app
app.listen(8888, '192.168.43.148')
console.log('you are listening to port 8888 at 192.168.43.148')

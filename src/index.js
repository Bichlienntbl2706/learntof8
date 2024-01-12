const path = require('path')
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const handlebars = require('express-handlebars').engine
const app = express()
const port = 3000
const db = require('./config/db/index')

//Connect to DB
db.connect()

const route = require('./routes')

app.use(express.static(path.join(__dirname, 'public'))) //kiểm tra bằng phương thức static
app.use(
  express.urlencoded({
    extended: true,
  })
)
app.use(express.json())

app.use(methodOverride('_method'))

//HTTP logger
app.use(morgan('combined'))

//template engine
app.engine(
  'hbs',
  handlebars({
    extname: '.hbs', //đổi tên .handlebars thành .hbs
    helpers: {
      //hành động ngoài của người dùng
      sum: (a, b) => a + b,
    },
  })
)

app.set('view engine', 'hbs') //đặt cho ứng dụng hiện tại sử dụng engine
app.set('views', path.join(__dirname, 'resources/views')) //cấu trúc của engine phải dẫn tới đúng đường link chưa folders views

//route init
route(app)

app.listen(port, () => {
  console.log(`A  pp listening on port http://localhost:${port}`)
})

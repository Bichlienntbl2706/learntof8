const path = require('path')
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const handlebars = require('express-handlebars').engine
const app = express()
const port = 3000
const db = require('./config/db/index')


const SortMiddleware = require('./app/middlewares/SortMiddleware')

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

app.use(SortMiddleware)

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
      sortable: (field, sort)=>{
        const sortType = field === sort.column ? sort.type : 'default'

        const icons = {
          default: 'oi oi-elevator',
          asc: 'oi oi-sort-ascending',
          desc: 'oi oi-sort-descending'
        }
        const types = {
          default: 'desc',
          asc: 'desc',
          desc: 'asc'
        }

        const icon = icons[sortType];
        const type = types[sortType];
          return `<a href="?_sort&column=${field}&type=${type}"><span class="${icon}"></span></a>`
      }
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

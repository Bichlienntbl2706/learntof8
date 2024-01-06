const path = require('path');
const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars").engine;
const app = express();
const port = 3000;
//HTTP logger
app.use(morgan('combined'));
//template engine
app.engine('hbs', handlebars({
    extname: '.hbs'
})); //
app.set('view engine', 'hbs'); //đặt cho ứng dụng hiện tại sử dụng engine
app.set('views', path.join(__dirname, 'resources/views'));

console.log(path.join(__dirname, 'resources/views'))

app.get("/", (req, res) => {
  res.render('home');
});

app.get("/news", (req, res) => {
  res.render('news');
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

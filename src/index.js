const path = require("path");
const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars").engine;
const app = express();
const port = 3000;


app.use(express.static(path.join(__dirname, 'public'))); //kiểm tra bằng phương thức static 

//HTTP logger
app.use(morgan("combined"));
//template engine
app.engine(
  "hbs",
  handlebars({
    extname: ".hbs", //đổi tên .handlebars thành .hbs
  })
); //
app.set("view engine", "hbs"); //đặt cho ứng dụng hiện tại sử dụng engine
app.set("views", path.join(__dirname, "resources/views")); //cấu trúc của engine phải dẫn tới đúng đường link chưa folders views

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/news", (req, res) => {
  res.render("news");//render ra 1 trang có tên là news(yêu cầu phải có file tên là news.hbs)
});
app.get("/search", (req, res) => {
  res.render("search");
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

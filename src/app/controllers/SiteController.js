const Course = require('../models/Course')
const { mutipleMongooseToObject } = require('../../util/mongoose')
class SiteController {
  //[GET] /
  async index(req, res, next) {
    // try {
    //   const courses = await Course.find({})
    //   res.json(courses)
    // } catch (error) {
    //   next(error)
    // }

    Course.find({})
      .then((courses) => {
        res.render('home', {
          courses: mutipleMongooseToObject(courses),
        })
      })

      .catch(next)
  }

  //[GET] /search
  search(req, res) {
    res.render('search')
  }
}

module.exports = new SiteController()

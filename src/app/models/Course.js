const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const Schema = mongoose.Schema

mongoose.plugin(slug)

const Course = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    videoId: { type: String, required: true },
    level: { type: String },
    slug: { type: String, slug: 'name', unique: true }, //lấy name tự động bỏ dấu
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Course', Course)

const mongoose = require('mongoose')
async function connect() {
  try {
    await mongoose.connect('mongodb://localhost:27017/f8_education_dev')
    console.log('connect succeefully')
  } catch (error) {
    console.log('fail!')
  }
}
module.exports = { connect }
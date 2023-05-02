const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/todosApp'

const connectDB = async () => {
  try {
    await mongoose.connect(url)
    console.log('connected Database MOngoDB')
  } catch (err) {
    console.log(err.message)
  }
}

module.exports = connectDB

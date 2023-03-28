const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

todoSchema.statics.getTodos = function () {
  //this
  console.log(this)
  return this.find()
}

// todos = new Todo()
//todo.comnpletodo()
todoSchema.methods.completeTodo = function () {
  this.completed = true
  return this.save()
}

//virtual field
todoSchema.virtual('status').get(function () {
  return this.completed ? 'Done' : 'pending'
})

todoSchema.set('toJSON', { virtuals: true })

module.exports = mongoose.model('Todo', todoSchema)

const jwt = require('jsonwebtoken')
const Todo = require('../models/Todo')

const authorizeTodo = async (req, res, next) => {
  //check if the todo exists or not
  const foundTodo = await Todo.findById({
    _id: req.params.id,
  })

  if (!foundTodo)
    return res.status(404).json({ success: false, err: 'Todo Not FOund' })

  const todo = await Todo.findOne({
    user: req.user.userId,
    _id: req.params.id,
  })
  if (!todo)
    return res.status(401).json({ success: false, error: 'unauthorized' })
  next()
  console.log(req.user)
}

module.exports = authorizeTodo

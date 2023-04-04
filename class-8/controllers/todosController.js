const Todo = require('../models/Todo')
const User = require('../models/User')

const getAllTodos = async (req, res, next) => {
  try {
    const todos = await Todo.getTodos().populate('user')
    res.json({
      success: true,
      data: todos,
    })
  } catch (err) {
    next(err)
  }
}

const createTodo = async (req, res, next) => {
  const userId = req.user.userId
  try {
    const todo = new Todo({
      title: req.body.title,
      description: req.body.description,
      user: userId,
    })
    //save todo
    const savedTodo = await todo.save()

    //find out user document
    const user = await User.findById(userId)

    user.todos.push(savedTodo._id)

    await user.save()

    res.status(201).json({
      success: true,
      data: savedTodo,
    })
  } catch (err) {
    next(err)
  }
}

const getTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id).populate({
      path: 'user',
      select: 'email',
    })
    if (!todo) {
      return res.status(404).json({ success: false, error: 'Todo Not Found' })
    }
    res.json({
      success: true,
      data: todo,
    })
  } catch (err) {
    next(err)
  }
}

const updateTodo = async (req, res, next) => {
  try {
    //finding the todo
    const todo = await Todo.findById(req.params.id)
    if (!todo) {
      return res.status(404).json({ success: false, error: 'Todo Not Found' })
    }
    todo.title = req.body.title
    todo.description = req.body.description
    const updatedTodos = await todo.save()

    res.json({
      success: true,
      data: updatedTodos,
    })
  } catch (err) {
    next(err)
  }
}

const deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id)
    if (!todo) {
      return res.status(404).json({ success: false, error: 'Todo Not Found' })
    }
    res.json({ success: true, data: todo })
  } catch (err) {
    next(err)
  }
}

const completeTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id)
    if (!todo) {
      return res.status(404).json({ success: false, error: 'Todo Not Found' })
    }
    const completedTodo = await todo.completeTodo()

    res.json({ success: true, data: completedTodo })
  } catch (err) {
    next(err)
  }
}

const getAllCompletedTodos = async (req, res, next) => {
  try {
    const completedTodos = await Todo.find({
      completed: true,
    })
    res.json({ success: true, data: completedTodos })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getAllTodos,
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
  completeTodo,
  getAllCompletedTodos,
}

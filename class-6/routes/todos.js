const express = require('express')
const router = express.Router()

//controllers
const TodosController = require('../controllers/todosController')

router.get('/', TodosController.getAllTodos)
router.get('/completed', TodosController.getAllCompletedTodos)
router.get('/:id', TodosController.getTodo)
router.post('/', TodosController.createTodo)
router.put('/:id', TodosController.updateTodo)
router.delete('/:id', TodosController.deleteTodo)
router.put('/:id/completed', TodosController.completeTodo)

module.exports = router

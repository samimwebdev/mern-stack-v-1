const express = require('express')
const path = require('path')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
const logger = require('./middlewares/logger')

const app = express()
const PORT = process.env.PORT || 3000

//CORS(cross origin resource sharing) communication and exchanging data
app.use(cors())
//serve static file
app.use('/', express.static(path.join(__dirname, 'public')))

//Parse JSON
app.use(express.json())

//handling Form Data
app.use(express.urlencoded({ extended: false }))

let tasks = [
  {
    id: 1,
    task: 'Sample Task 1',
    completed: false,
  },
  {
    id: 2,
    task: 'Sample Task 2',
    completed: true,
  },
  {
    id: 3,
    task: 'Sample Task 3',
    completed: false,
  },
]

//Get All Tasks
app.get('/tasks', (req, res) => {
  res.status(200).json({
    success: true,
    data: tasks,
  })
})

//Get a Single Task
app.get('/tasks/:id', (req, res) => {
  const taskId = +req.params.id

  //Find a Single todo based on taskId
  const foundTask = tasks.find((task) => task.id === taskId)
  if (!foundTask) {
    return res.status(404).json({
      success: true,
      data: null,
    })
  }
  res.status(200).json({
    success: true,
    data: foundTask,
  })
})

//adding a task (POST)
app.post('/tasks', (req, res) => {
  //Tasks data sending form client
  console.log(req.body)

  const newTask = {
    id: tasks[tasks.length - 1].id + 1,
    ...req.body,
  }
  tasks.push(newTask)

  res.status(200).json({
    success: true,
    data: tasks,
  })
})

//updating a task(PUT)
app.put('/tasks/:id', (req, res) => {
  const taskId = +req.params.id
  const dataToUpdate = req.body.completed

  //find the task by TaskID
  //Find a Single todo based on taskId
  const foundTask = tasks.find((task) => task.id === taskId)
  if (!foundTask) {
    return res.status(400).json({
      success: false,
      data: null,
    })
  }

  tasks = tasks.map((task) => {
    if (task.id === taskId) {
      //update
      return {
        ...task,
        completed: dataToUpdate,
      }
    } else {
      return task
      //Keep as previous format
    }
  })

  console.log({ tasks })

  res.status(200).json({
    success: true,
    data: tasks,
  })
})

//Deleting a task (DELETE)

app.delete('/tasks/:id', (req, res) => {
  const taskId = +req.params.id

  //find the task by TaskID
  //Find a Single todo based on taskId
  const foundTask = tasks.find((task) => task.id === taskId)
  if (!foundTask) {
    return res.status(400).json({
      success: false,
      data: null,
    })
  }

  tasks = tasks.filter((task) => task.id !== taskId)

  console.log({ tasks })

  res.status(200).json({
    success: true,
    data: tasks,
  })
})

//Error Handling Middleware
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Express JS is Running on port ${PORT}`)
})

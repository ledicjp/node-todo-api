const { ObjectID } = require('mongodb')

let express = require('express')
let bodyParser = require('body-parser')

let { mongoose } = require('./db/mongoose')
let { Todo } = require('./models/todo')
let { User } = require('./models/user')

let app = express()

app.use(bodyParser.json())

app.post('/todos', (req, res) => {
  let todo = new Todo({
    text: req.body.text
  })

  todo.save().then(
    doc => {
      res.send(doc)
    },
    e => {
      res.status(400).send(e)
    }
  )
})

// GET /todos/12345678
app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  if (!ObjectID.isValid(id)) {
    res.status(404).send()
  }
  Todo.findById(id)
    .then(todo => {
      if (!todo) {
        res.status(404).send()
      }
      res.send({ todo })
    })
    .catch(e => res.status(404).send())
})

app.get('/todos', (req, res) => {
  Todo.find().then(
    todos => {
      res.send({ todos })
    },
    err => {
      res.status(400).send(e)
    }
  )
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})

module.exports = {
  app
}
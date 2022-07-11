import './App.css'

import axios from 'axios'
import { Form, Formik } from 'formik'
import React from 'react'

import logo from './logo.svg'
import { ToDo } from './types/schemata'

function App() {
  //maintain state
  const [todos, setTodos] = React.useState<ToDo[]>([])
  React.useEffect(() => {
    showAllTodos(setTodos)
  }, [])

  const q1Todos = todos.filter((todo) => {
    return todo.importance > 5 && todo.urgency > 5
  })

  const q2Todos = todos.filter((todo) => {
    return todo.importance > 5 && todo.urgency < 5
  })

  const q3Todos = todos.filter((todo) => {
    return todo.importance < 5 && todo.urgency > 5
  })

  const q4Todos = todos.filter((todo) => {
    return todo.importance < 5 && todo.urgency < 5
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="todo-grid">
          <div className="todo-cell">
            {q1Todos.map((todo, idx) => (
              <p key={idx}>{todo.title}</p>
            ))}
          </div>
          <div className="todo-cell">
            {q2Todos.map((todo, idx) => (
              <p key={idx}>{todo.title}</p>
            ))}
          </div>
          <div className="todo-cell">
            {q3Todos.map((todo, idx) => (
              <p key={idx}>{todo.title}</p>
            ))}
          </div>
          <div className="todo-cell">
            {q4Todos.map((todo, idx) => (
              <p key={idx}>{todo.title}</p>
            ))}
          </div>
        </div>
        <Formik
          initialValues={todoCreateInitialValues}
          onSubmit={(values, actions) => {
            console.log(values)
            // createTodo(values)
          }}
        >
          {(props) => (
            <Form onSubmit={props.handleSubmit}>
              <input
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.title}
                name="title"
              />
              <input
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.description}
                name="description"
              />
              <input
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.urgency}
                name="name"
              />
              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </header>
    </div>
  )
}

const todoCreateInitialValues: ToDo = {
  title: '',
  description: '',
  urgency: 0,
  importance: 0,
  deadline: undefined,
  status: 'Not Started',
}

// const TodoGrid = styled.div`
//   display: 'grid';
//   min-width: '500px';
// `

function createTodo(data: ToDo) {
  return fetch('/.netlify/functions/todo-crud', {
    body: JSON.stringify(data),
    method: 'POST',
  })
    .then((response) => {
      return response.json()
    })
    .catch((reason) => {
      console.log(reason)
    })
}

//for now maintain state here
function showAllTodos(setState) {
  return axios.get('/.netlify/functions/todo-crud/').then((res) => {
    const todos = res.data
    const formattedTodos = todos.map((todo: any) => {
      return todo.data
    })

    setState(formattedTodos)
  })
}

function helloWorld() {
  return fetch('/.netlify/functions/hello-world')
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((reason) => {
      console.log(reason)
    })
}

// Todo data
const myTodo: ToDo = {
  title: 'dummy todo',
  description: 'a todo for testing',
  deadline: '2022-12-25',
  status: 'Not Started',
  importance: 10,
  urgency: 0,
}

export default App

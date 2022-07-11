import './App.css'

import axios from 'axios'
import { Field, Form, Formik } from 'formik'
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
          onSubmit={(values) => {
            console.log(values)
            createTodo(values)
            setTodos((todos) => [...todos, values])
          }}
        >
          {(props) => (
            <Form onSubmit={props.handleSubmit}>
              <label htmlFor="name">Title</label>
              <Field
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.title}
                name="title"
              />
              <label htmlFor="description">Description</label>
              <Field
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.description}
                name="description"
              />
              <Field name="status" as="select">
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </Field>
              <Field name="urgency" as="select">
                <option value="0">Not Urgent</option>
                <option value="10">Urgent</option>
              </Field>
              <Field name="importance" as="select">
                <option value="0">Not Important</option>
                <option value="10">Important</option>
              </Field>
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

export default App

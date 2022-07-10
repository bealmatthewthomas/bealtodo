import './App.css'

import axios from 'axios'
import { Form, Formik } from 'formik'
import React from 'react'
import { styled } from 'styled-components'

import logo from './logo.svg'
import { ToDo } from './types/schemata'

function App() {
  //maintain state
  const [todos, setTodos] = React.useState<ToDo[]>([])
  React.useEffect(() => {
    showAllTodos(setTodos)
  }, [])

  const todoCreateInitialValues: ToDo = {
    title: '',
    description: '',
    urgency: 0,
    importance: 0,
    deadline: undefined,
    status: 'Not Started',
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="body">
          <button onClick={() => createTodo(myTodo)}>🪂 Create Todo</button>
          <button onClick={() => helloWorld()}>🪂 Sanity Check</button>
        </div>
        <div className="todoGrid"></div>
        <ul>
          {todos.map((todo, idx) => (
            <li key={idx}>{todo.title}</li>
          ))}
        </ul>
        {/* <Formik
          initialValues={todoCreateInitialValues}
          onSubmit={(values, actions) => {
            console.log(values)
            // createTodo(values)
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
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
              {props.errors && <div id="feedback">{props.errors}</div>}
              <button type="submit">Submit</button>
            </form>
          )}
        </Formik> */}
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

const TodoGrid = styled.div`
  display: 'grid';
  min-width: '500px';
`

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

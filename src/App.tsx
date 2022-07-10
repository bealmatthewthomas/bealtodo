import './App.css'

// import { useTodos } from './hooks/useTodos'
import logo from './logo.svg'
import { ToDo } from './types/schemata'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="body">
          <button onClick={() => createTodo(myTodo)}>🪂 Create Todo</button>
          <button onClick={() => helloWorld()}>🪂 Sanity Check</button>
        </div>
      </header>
    </div>
  )
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

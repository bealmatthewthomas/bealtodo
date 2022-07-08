import './App.css'

import { useState } from 'react'

import { useTodos } from './hooks/useTodos'
import logo from './logo.svg'
import { ToDo } from './types/schemata'

function App() {
  const [count, setCount] = useState(0)
  const todos = useTodos()

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="body">
          <button onClick={() => setCount((count) => count + 1)}>
            🪂 Click me : {count}
          </button>
        </div>
        {todos.map((todo: ToDo) => (
          <p key={todo.title}>{todo.title}</p>
        ))}
        
      </header>
    </div>
  )
}

export default App

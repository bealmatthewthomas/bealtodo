import { ToDo } from '../../types/schemata'

export const Todo = (todo: ToDo) => (
  <div>
    <ul>
      <li>{todo.title}</li>
      <li>{todo.description}</li>
      <li>{todo.urgency}</li>
      <li>{todo.importance}</li>
      <li>{todo.status}</li>
      <li>{todo.deadline}</li>
    </ul>
  </div>
)

import { ToDo } from '../types/schemata'
import useLocalStorage from './useStorage'

export function mutateTodos() {
  const [, setTodos] = useLocalStorage('todos', {})

  const mutateTodos = (todos: ToDo[]) => {
    setTodos(todos)
  }

  return mutateTodos
}

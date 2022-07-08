import { ToDo } from '../types/schemata'
import useLocalStorage from './useStorage'

export function useTodos() {
  const [todos] = useLocalStorage('todos', todoList)
  console.log(todos)
  return todos
}

const todoList: ToDo[] = [
  {
    title: 'CAPI',
    description: 'Write Documentation for Azat',
    status: 'Done',
    importance: 10,
    urgency: 10,
  },
]

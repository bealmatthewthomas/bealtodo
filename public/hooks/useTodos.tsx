import useLocalStorage from './useStorage'

export function useTodos() {
  const [todos] = useLocalStorage('todos', {})

  return todos
}

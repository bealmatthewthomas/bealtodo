// For now, User will refer to all data in localstorage.
// Once I back this with a DB we can evolve this
export interface User {
  todos: ToDo[]
  username: string
}

export interface ToDo {
  title: string
  description: string
  deadline?: string
  status: 'Done' | 'In Progress' | 'Not Started'
  importance: 0 | 10
  urgency: 0 | 10
}

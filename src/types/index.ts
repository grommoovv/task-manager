interface Task {
  id: string
  title: string
  description?: string
  date: string
  isCompleted: boolean
  isImportant: boolean
  createdAt: Date
  updatedAt: Date
  userID: string
}

export type { Task }

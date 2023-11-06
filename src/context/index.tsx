'use client'
import { Theme, themes } from '@/helpers/themes'
import { Task } from '@/types'
import { useUser } from '@clerk/nextjs'
import { FC, PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

interface AppContext {}

const AppContext = createContext({
  tasks: [] as Task[],
  importantTasks: [] as Task[],
  completedTasks: [] as Task[],
  incompletedTasks: [] as Task[],
  theme: {} as Theme,
  isLoading: true,
  isCollapsed: true,
  isModal: true,
  openModal: () => {},
  closeModal: () => {},
  collapseMenu: () => {},
  getTasks: () => {},
  deleteTask: (id: string) => {},
  updateTask: ({ id, isCompleted }: { id: string; isCompleted: boolean }) => {},
})

const useAppContext = () => useContext(AppContext)

const AppContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useUser()

  useEffect(() => {
    if (user) {
      getTasks()
    }
  }, [user])

  useEffect(() => {
    setTimeout(() => {
      setMounted(true)
    }, 250)
  }, [])

  const [isMounted, setMounted] = useState(false)
  const [tasks, setTasks] = useState<Task[]>([])
  const [currentTheme, setCurrentTheme] = useState(0)
  const [isLoading, setLoading] = useState(true)
  const [isModal, setModal] = useState(false)
  const [isCollapsed, setCollapsed] = useState(false)

  const importantTasks = tasks.filter((t) => t.isImportant === true)
  const completedTasks = tasks.filter((t) => t.isCompleted === true)
  const incompletedTasks = tasks.filter((t) => t.isCompleted === false)

  const theme = themes[currentTheme]

  const openModal = () => {
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
  }

  const collapseMenu = () => {
    setCollapsed(!isCollapsed)
  }

  const getTasks = async () => {
    try {
      const call = await fetch('/api')
      const data: any[] = await call.json()
      const sorted = data.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })

      setTasks(sorted)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const deleteTask = async (id: string) => {
    try {
      const call = await fetch('/api', { method: 'DELETE', body: JSON.stringify({ id }) })
      console.log('call:', call)

      if (!call.ok) {
        toast.error('Something went wrong...')
        return
      }

      toast.success('Task deleted')
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong...')
    } finally {
      getTasks()
    }
  }

  const updateTask = async (data: any) => {
    try {
      const call = await fetch('/api', { method: 'PUT', body: JSON.stringify(data) })
      console.log('call:', call)
      if (!call.ok) {
        toast.error('Something went wrong...')
        return
      }
      toast.success('Task updated')
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong...')
    } finally {
      getTasks()
    }
  }

  const value = {
    tasks,
    importantTasks,
    completedTasks,
    incompletedTasks,
    theme,
    isLoading,
    isCollapsed,
    isModal,
    openModal,
    closeModal,
    collapseMenu,
    getTasks,
    deleteTask,
    updateTask,
  }

  if (!isMounted) {
    return (
      <div className='init'>
        <span className='loader'></span>
      </div>
    )
  }

  return (
    <AppContext.Provider value={value}>
      <Toaster />
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, useAppContext, AppContextProvider }

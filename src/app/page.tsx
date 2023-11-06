'use client'
import { TaskList } from '@/components/TaskList/TaskList'
import { useAppContext } from '@/context'

const Page = () => {
  const { tasks } = useAppContext()

  return <TaskList title='All Tasks' tasks={tasks} />
}

export default Page

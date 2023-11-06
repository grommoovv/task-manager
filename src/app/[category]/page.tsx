'use client'

import { TaskList } from '@/components/TaskList/TaskList'
import { useAppContext } from '@/context'

interface PageProps {
  params: {
    category: 'important' | 'completed' | 'incompleted'
  }
}

const Page = ({ params: { category } }: PageProps) => {
  const { importantTasks, completedTasks, incompletedTasks } = useAppContext()

  const title =
    category === 'important'
      ? 'Important Tasks'
      : category === 'completed'
      ? 'Completed Tasks'
      : 'Incompleted Tasks'

  const tasks =
    category === 'important'
      ? importantTasks
      : category === 'completed'
      ? completedTasks
      : incompletedTasks

  return <TaskList title={title} tasks={tasks}></TaskList>
}

export default Page

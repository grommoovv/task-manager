'use client'
import React, { FC } from 'react'
import { CreateTaskForm } from '../CreateTaskForm/CreateTaskForm'
import { TaskCard } from '../TaskCard/TaskCard'
import { Modal } from '../Modal/Modal'
import { StyledTaskList } from './styles'
import { useAppContext } from '@/context'
import { add, plus } from '@/helpers/icons'

interface TaskListProps {
  title: string
  tasks: any[]
}

const TaskList: FC<TaskListProps> = ({ title, tasks }) => {
  const { theme, openModal, isModal } = useAppContext()

  return (
    <StyledTaskList theme={theme}>
      {isModal && <Modal children={<CreateTaskForm />} />}
      <h1>{title}</h1>

      <button className='btn-rounded' onClick={openModal}>
        {plus}
      </button>

      <div className='tasks grid'>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            title={task.title}
            description={task.description}
            date={task.date}
            isCompleted={task.isCompleted}
            id={task.id}
          />
        ))}
        <button className='create-task' onClick={openModal}>
          {add}
          Add New Task
        </button>
      </div>
    </StyledTaskList>
  )
}

export { TaskList }

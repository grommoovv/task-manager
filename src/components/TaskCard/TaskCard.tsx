'use client'
import React, { FC } from 'react'
import { StyledTaskCard } from './styles'
import { formatDate } from '@/helpers'
import { edit, trash } from '@/helpers/icons'
import { useAppContext } from '@/context'

interface TaskCardProps {
  title: string
  description: string
  date: string
  isCompleted: boolean
  id: string
}

const TaskCard: FC<TaskCardProps> = ({ title, description, date, isCompleted, id }) => {
  const { theme, deleteTask, updateTask } = useAppContext()
  return (
    <StyledTaskCard theme={theme}>
      <h1>{title}</h1>
      <p>{description}</p>
      <p className='date'>{formatDate(date)}</p>
      <div className='task-footer'>
        {isCompleted ? (
          <button
            className='completed'
            onClick={() => {
              updateTask({
                id,
                isCompleted: !isCompleted,
              })
            }}
          >
            Completed
          </button>
        ) : (
          <button
            className='incomplete'
            onClick={() => {
              updateTask({
                id,
                isCompleted: !isCompleted,
              })
            }}
          >
            Incomplete
          </button>
        )}
        <button className='edit'>{edit}</button>
        <button
          className='delete'
          onClick={() => {
            deleteTask(id)
          }}
        >
          {trash}
        </button>
      </div>
    </StyledTaskCard>
  )
}

export { TaskCard }

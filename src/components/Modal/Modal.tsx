'use client'
import { FC, PropsWithChildren } from 'react'
import { StyledModal } from './styles'
import { useAppContext } from '@/context'

const Modal: FC<PropsWithChildren> = ({ children }) => {
  const { theme, closeModal } = useAppContext()
  return (
    <StyledModal theme={theme}>
      <div className='modal-overlay' onClick={closeModal}></div>
      <div className='modal-content'>{children}</div>
    </StyledModal>
  )
}

export { Modal }

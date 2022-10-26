import React from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const BackDrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: ${props => props.transparent ? 'transparent' : 'rgba(0,0,0,0.7)'};
  z-index: 15;
`

function Modal(props) {
  const root = document.getElementById('root')
  const { isOpen, targetComponent: targetComponentName, transparent=false } = useSelector(state => state.modal)
  if (!targetComponentName || !isOpen) {
    return null
  }

  const TargetComponent = React.lazy(() => import(`../layer/${targetComponentName}.jsx`))

  return (
    createPortal((
      <React.Suspense>
        <BackDrop transparent={transparent}>
        </BackDrop>
        <TargetComponent></TargetComponent>
      </React.Suspense>
    ), root)

  )

}

export default Modal

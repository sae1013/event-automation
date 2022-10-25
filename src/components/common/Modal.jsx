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
  background-color: ${props => props.transparent ? '#f2f2f2' : 'rgba(0,0,0,0.7)'};
  z-index: 15;
`

function Modal(props) {
  const root = document.getElementById('root')
  const { isOpen, targetComponent: targetComponentName, transparent } = useSelector(state => state.modal)
  console.log(targetComponentName)
  if (!targetComponentName || !isOpen) {
    return null
  }

  const TargetComponent = React.lazy(() => import(`../layer/${targetComponentName}.jsx`))

  return (
    createPortal((
      <React.Suspense>
        <BackDrop transparent={props.transparent}>
        </BackDrop>
        <TargetComponent></TargetComponent>
      </React.Suspense>
    ), root)

  )

}

export default Modal

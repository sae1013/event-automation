import React from 'react'
import styled from 'styled-components';

const InputForm = styled.input`
  
`;

function Input({ onChange,onBlur,name,ref }) {

  return (
    <input
      type={'text'}
      onChange={onChange} // assign onChange event
      onBlur={onBlur} // assign onBlur event
      name={name} // assign name prop
      ref={ref} // assign ref prop
    />
  )
}

export default Input
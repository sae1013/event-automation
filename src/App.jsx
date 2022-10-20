import React,{useRef} from 'react'
import "./App.css";
import {Link, Routes, Route} from 'react-router-dom';
import EventMaker from './components/EventMaker.jsx';
import {useSelector, useDispatch} from 'react-redux';
import {increment} from './redux/slices/counterSlice.js'
import styled from 'styled-components';
import {Rnd} from 'react-rnd';
import FormValidate from './components/FormValidate.jsx';

const Box = styled.div`
  width:300px;
  height:300px;
  background-color:grey;
`;

function App(props) {
  // const count = useSelector(state => state.counter.value)
  // console.log(count)
  // const dispatch = useDispatch();
  const ref = useRef();
  
  const onClick = (e) => {
    const {x,y} = ref.current.draggable.state
    console.log(x,y)
    console.log(ref.current.resizable.state.width,ref.current.resizable.state.height)
    //해당값을 찾아오면 됨. 
  }
  return (
    <div className="container">
        
    <Rnd
      ref = {ref}
      onClick={onClick}
      default={{
        x: 300,
        y: 300,
        width: 300,
        height: 100,

      }}
      // minWidth={100}
      // minHeight={100}
      bounds="parent"
    >
      {/* <Box /> */}
    </Rnd>
  
          
        <Routes>
          <Route path={"/form"} element={<FormValidate/>}></Route>
          <Route path="/event-maker" element = {<EventMaker/>}></Route>
        </Routes>
    </div>
  )
}

export default App
import React,{useRef} from 'react'
import "./App.css";
import {Link, Route,Switch} from 'react-router-dom';
import EventMaker from './components/EventMaker.jsx';
import DashBoard from './components/DashBoard.jsx';

import {useSelector, useDispatch} from 'react-redux';
import './styles/common/reset.scss'

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

  }
  return (
    <div className="container">

    {/*<Rnd*/}
    {/*  ref = {ref}*/}
    {/*  onClick={onClick}*/}
    {/*  default={{*/}
    {/*    x: 300,*/}
    {/*    y: 300,*/}
    {/*    width: 300,*/}
    {/*    height: 100,*/}

    {/*  }}*/}
    {/*  // minWidth={100}*/}
    {/*  // minHeight={100}*/}
    {/*  bounds="parent"*/}
    {/*>*/}
    {/*  /!* <Box /> *!/*/}
    {/*</Rnd>*/}
  
          
        <Switch>
          <Route path={"/form"}>
            <FormValidate/>
          </Route>
          <Route path="/eventform">
            <EventMaker/>
          </Route>
          <Route path="/dashboard">
            <DashBoard/>
          </Route>
        </Switch>
    </div>
  )
}

export default App
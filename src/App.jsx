import React from 'react'
import "./App.css";
import {Link, Routes, Route} from 'react-router-dom';
import EventMaker from './components/EventMaker.jsx';
import {useSelector, useDispatch} from 'react-redux';
import {increment} from './redux/slices/counterSlice.js'

function App(props) {
  const count = useSelector(state => state.counter.value)
  console.log(count)
  const dispatch = useDispatch();

  return (
    <div className="container">
      <Routes>
        <Route path="/event-maker" element = {<EventMaker/>}></Route>
      </Routes>
    </div>
  )
}

export default App
import React,{useRef} from 'react'
import "./App.css";
import {Link, Route,Switch} from 'react-router-dom';
import EventMaker from './components/EventMaker.jsx';
import DashBoard from './components/DashBoard.jsx';
import './styles/common/reset.scss'
import styled from 'styled-components';
import FormValidate from './components/FormValidate.jsx';
import EventPage from './components/event/EventPage.jsx';

function App(props) {

  return (
    <div className="container">

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
          <Route path ="/event/:id">
            <EventPage></EventPage>
          </Route>
        </Switch>
    </div>
  )
}

export default App
import React, { useRef } from 'react'
import styles from './App.module.scss';
import { Link, Route, Switch } from 'react-router-dom'
import EventMaker from './components/EventMaker.jsx'
import DashBoard from './components/DashBoard.jsx'
import './styles/common/reset.scss'
import FormValidate from './components/FormValidate.jsx'
import EventPage from './components/event/EventPage.jsx'
import Home from './components/home/Home.jsx'
import Header from './components/layout/Header.jsx'
import {useSelector} from 'react-redux';
import Modal from './components/common/Modal.jsx';
function App(props) {
  return (
    <>
      <Header />
      <Modal />
      <div className={styles.container}>
        <Switch>
          <Route path={'/'} exact={true}>
            <Home />
          </Route>
          <Route path={'/form'}>
            <FormValidate />
          </Route>
          <Route path='/eventform'>
            <EventMaker />
          </Route>
          <Route path='/dashboard'>
            <DashBoard />
          </Route>
          <Route path='/event/:id'>
            <EventPage></EventPage>
          </Route>
        </Switch>
      </div>
    </>
  )
}

export default App
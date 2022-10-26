import React, { useRef } from 'react'
import styles from './App.module.scss';
import { Link, Redirect, Route, Switch } from 'react-router-dom'
import DashBoard from './components/dashboard/DashBoard.jsx'
import './styles/common/reset.scss'

import EventPage from './components/event/EventPage.jsx'
import Home from './components/home/Home.jsx'
import Header from './components/layout/Header.jsx'
import Modal from './components/common/Modal.jsx';
import Page404 from './components/layout/Page404.jsx';
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
          <Route path='/dashboard'>
            <DashBoard />
          </Route>
          <Route path='/event/:id'>
            <EventPage></EventPage>
          </Route>
          <Route path='/404page' exact={true}>
            <Page404></Page404>
          </Route>
          <Route>
            <Redirect to={'/404page'}/>
          </Route>
        </Switch>
      </div>
    </>
  )
}

export default App
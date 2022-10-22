import React from 'react'
import styles from '../styles/event/DashBoard.module.scss';
import { Route,Switch } from 'react-router-dom'
import FormValidate from './FormValidate.jsx'
import EventMaker from './EventMaker.jsx'
import EnrollEvent from './event/EnrollEvent.jsx';
import EditEvent from './event/EditEvent.jsx';
import SearchEvent from './event/SearchEvent.jsx';
import { useHistory,useParams,useLocation } from "react-router-dom";

function DashBoard(props) {
  const history = useHistory();
  const location = useLocation();
  console.log(location.pathname)
  // const params = useParams();

  return (
    <div className={styles.container}>
      <section className={styles.left}>
        <ul>
          <li className = {location.pathname == '/dashboard' ? styles.highlight:''} onClick={()=> history.push('/dashboard')}>
            이벤트 등록하기
          </li>
          <li className= {location.pathname == '/dashboard/edit' ? styles.highlight:''}onClick={()=>history.push('/dashboard/edit')}>
            이벤트 수정하기
          </li>
          <li className = {location.pathname == '/dashboard/search' ? styles.highlight:''} onClick={()=> history.push('/dashboard/search')}>
            이벤트 조회하기
          </li>
        </ul>
      </section>
      <section className={styles.right}>
        <Switch>
          <Route path={"/"}>
            <EnrollEvent/>
          </Route>
          <Route path="/edit">
            <EditEvent/>
          </Route>
          <Route path="/search">
            <SearchEvent/>
          </Route>
        </Switch>
      </section>
    </div>
  )
}

export default DashBoard
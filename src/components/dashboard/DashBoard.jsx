import React from 'react'
import styles from '../../styles/dashboard/DashBoard.module.scss';
import { Redirect, Route, Switch } from 'react-router-dom'
import EnrollEvent from './EnrollEvent.jsx';
import EditEvent from './EditEvent.jsx';
import SearchEvent from './SearchEvent.jsx';
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
          <li className = {location.pathname == '/dashboard/enroll' ? styles.highlight:''} onClick={()=> history.push('/dashboard/enroll')}>
            이벤트 등록하기
          </li>
          {/*<li className= {location.pathname == '/dashboard/edit' ? styles.highlight:''}onClick={()=>history.push('/dashboard/edit')}>*/}
          {/*  이벤트 수정하기*/}
          {/*</li>*/}
          <li className = {location.pathname == '/dashboard/search' ? styles.highlight:''} onClick={()=> history.push('/dashboard/search')}>
            이벤트 조회하기
          </li>
        </ul>
      </section>
      <section className={styles.right}>
        <Switch>
          <Route path={"/dashboard/enroll"} exact={true}>
            <EnrollEvent/>
          </Route>
          <Route path="/dashboard/edit" exact={true}>
            <EditEvent/>
          </Route>
          <Route path="/dashboard/search" exact={true}>
            <SearchEvent/>
          </Route>
          <Route>
            <Redirect to={'/404page'}/>
          </Route>
        </Switch>
      </section>
    </div>
  )
}

export default DashBoard
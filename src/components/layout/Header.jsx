import React from 'react'
import styles from '../../styles/layout/Header.module.scss'
import { useHistory } from 'react-router-dom'
import { MdSpaceDashboard } from 'react-icons/md'
import { MdOutlineAutoFixHigh } from 'react-icons/md'

function Header() {
  const history = useHistory()

  const NavHandler = (e) => {
    const target = e.currentTarget.getAttribute('data-index')
    switch (target) {
      case 'home':
        history.push('/')
        break
      case 'dashboard':
        history.push('/dashboard/enroll')
        break
      case 'login':
        history.push('/')
        break
    }
  }

  return (
    <div className={styles.container}>
      <ul>
        <li onClick={NavHandler} data-index={'home'} className={styles.logo}>
          <span>
            <MdOutlineAutoFixHigh style={{width:'30px',height:'30px'}}/>
          </span>
          <span dangerouslySetInnerHTML={{__html:'Event<br/>Generator'}}>
          </span>
        </li>

        <li onClick={NavHandler} data-index={'dashboard'} className={styles.dashboard}>
          <span>
            <MdSpaceDashboard style={{ width: '25px', height: '25px' }} />
          </span>
          <span>대시보드</span>
        </li>
        <li onClick={NavHandler} data-index={'login'}>로그인</li>
      </ul>

    </div>
  )
}

export default Header
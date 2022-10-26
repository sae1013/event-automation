import React from 'react'
import styles from '../../styles/layout/Page404.module.scss';
import {TbError404} from 'react-icons/tb';
import {FcHome} from 'react-icons/fc';
import {FcSearch} from 'react-icons/fc';
import {useHistory} from 'react-router-dom';

function Page404(props) {
  const history = useHistory();

  return (
    <div className={styles.page404__container}>
      <div className={styles.top}>
        <span className={styles.icon__404}>
          <TbError404 style={{width:'150px' , height:'150px',fill:'#FF5858'}}/>
          {/*<FcSearch style={{width:'100px' , height:'100px'}}/>*/}
        </span>
        <p>페이지를 찾을 수 없습니다</p>
      </div>

      <div className={styles.bottom} onClick={() => {history.push('/')}}>
        <FcHome style={{width:'80px' , height:'80px'}}/>
      </div>
    </div>
  )
}

export default Page404
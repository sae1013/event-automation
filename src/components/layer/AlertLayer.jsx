import React from 'react'
import styles from '../../styles/layer/AlertLayer.module.scss';
import {useSelector,useDispatch} from 'react-redux';
import {handleCloseLayer} from '../../redux/slices/modalSlice.js'

function AlertLayer(props) {
  const {transparent,message,confirmCallback} = useSelector(state => state.modal);
  const dispatch = useDispatch();

  const onClickHandler = () => {
    if(confirmCallback){
      dispatch(handleCloseLayer());
      confirmCallback();
    }else {
      dispatch(handleCloseLayer());
    }
  }
  return (
    <div className={`${styles.alert__container} ${transparent ? styles.transparent :''  }`}>
      <p dangerouslySetInnerHTML={{__html:message}}></p>
      <button onClick={onClickHandler}>확&nbsp;&nbsp;&nbsp;&nbsp;인</button>
    </div>
  )
}

export default AlertLayer
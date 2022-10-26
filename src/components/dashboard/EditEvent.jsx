import React from 'react'
import {handleOpenAlertLayer,handleCloseLayer} from '../../redux/slices/modalSlice.js'
import {useDispatch,useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import axiosInstance from '../../utils/axios.js'
import Modal from '../common/Modal.jsx';

//테스트 컴포넌트 (운영에 반영 x)
function EditEvent(props) {
  const history = useHistory();
  const {isOpen,targetComponent,confirmCallback} = useSelector(state => state.modal)
  const dispatch = useDispatch();
  const deleteEventHandler = async() => {
    const option = {
      url:'/event',
      method:'DELETE',
      data: {
        eventId:130
      }
    }
    await axiosInstance(option)
  }

  const loginHandler = async() => {
    const option = {
      headers:{
        'Access-Control-Allow-Origin': 'http://localhost:8080'
      },
      url:'/user/login',
      withCredentials: true,
      method:'POST',
      data: {
        email:'jmw93',
        password:'123123'
      }
    }
   const res = await axiosInstance(option)
    console.log(res)
  }


  const requestHandler = async() => {
    const option = {
      url:'/user',
      method:'GET',
      withCredentials:true,
      headers:{
        'content-type': 'application/json',
        // 'Access-Control-Allow-Origin': 'http://localhost:8080',
      },


    }
    const res = await axiosInstance(option)
    console.log(res.data);
  }

  console.log('confirm',confirmCallback)
  return (
    <div>
      <button onClick={() => deleteEventHandler()}>
        삭제
      </button>
      <button onClick={() => loginHandler()}>로그인</button>
      <button onClick={() => requestHandler()}>임의 요청</button>
      <button onClick={()=> dispatch(handleOpenAlertLayer({message:'로그인이 필요합니다',confirmCallback:() => {history.push('/')}}))}>모달</button>
      <button onClick={()=> dispatch(handleOpenAlertLayer({message:'ㄹㄴㅇㄹ'}))}>모달스타일</button>
      <button onClick={()=> dispatch(handleCloseLayer(()=>{console.log('hello')}))}>모달</button>
      <Modal></Modal>
    </div>

  )
}

export default EditEvent
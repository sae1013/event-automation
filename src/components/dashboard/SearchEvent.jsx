import React, { useState, useEffect } from 'react'
import styles from '../../styles/dashboard/SearchEvent.module.scss'
import { AiFillCloseCircle } from 'react-icons/ai'
import {FiEdit} from 'react-icons/fi'
import axiosInstance from '../../utils/axios.js'
import { handleOpenAlertLayer } from '../../redux/slices/modalSlice.js'
import {parseDateToString} from '../../utils/parseUtil.js'
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';


function SearchEvent(props) {
  const history = useHistory();
  const [events, setEvents] = useState([])
  const [refresh,setRefresh] = useState(false);
  const dispatch = useDispatch();
  const fetchData = async (url) => {
    try {
      const res = await axiosInstance.get('/event')
      setEvents(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [refresh])

  const deleteEventHandler = async(e,eventId) => {
    e.stopPropagation()

    try{
      const option = {
        url:'/event',
        method:'DELETE',
        data: {
          eventId:eventId
        }
      }
      const result = await axiosInstance(option)
      dispatch(handleOpenAlertLayer({message:result.data.message}))
      setRefresh(!refresh)
    }catch(err){
      dispatch(handleOpenAlertLayer({message:err?.message}))
    }

  }

  const editEventHandler = (e,eventId) => {
    e.stopPropagation()
    history.push(`/dashboard/edit/${eventId}`)
  }

  return (
    <div className={styles.search__container}>
      <p className={styles.title}>총 <span className={styles.highlight}>{events.length}</span> 건의 이벤트가 있습니다.</p>
      <section className={styles.board__wrap}>
        <table>
          <thead>
          <tr>
            <th>NO</th>
            <th>이벤트번호</th>
            <th>제목</th>
            <th>이벤트기간</th>
            <th></th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          {events.map((event, idx) => {
            return (
              <tr key={event?._id} onClick={()=>history.push(`/event/${event.eventId}`)}>
                <td>{idx + 1}</td>
                <td>{event?.eventId}</td>
                <td>{event?.eventTitle}</td>
                <td>{parseDateToString(event?.eventStartDate)} ~ {parseDateToString(event?.eventEndDate)}</td>
                <td>
                <span className={`${styles.btn} ${styles.btn__close}`} onClick={(e) => deleteEventHandler(e,event?.eventId)}>
                  <AiFillCloseCircle style={{ width: '2rem', height: '2rem', fill: 'red' }} />
                </span>
                <span className={styles.btn__alert}>삭제</span>
                </td>
                <td>
                <span className={`${styles.btn} ${styles.btn__edit}`} onClick={(e) => editEventHandler(e,event?.eventId)}>
                  <FiEdit style={{ width: '1.5rem', height: '1.5rem', fill: '#7DE5ED' }} />
                </span>
                <span className={styles.btn__alert}>수정</span>
                </td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default SearchEvent
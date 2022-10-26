import React, { useState, useEffect } from 'react'
import styles from '../../styles/dashboard/SearchEvent.module.scss'
import { AiFillCloseCircle } from 'react-icons/ai'
import axios from 'axios'
import { handleOpenAlertLayer } from '../../redux/slices/modalSlice.js'
import {parseDateToString} from '../../utils/parseUtil.js'
import {useDispatch} from 'react-redux';
const baseUrl = 'http://localhost:8080'

function SearchEvent(props) {
  const [events, setEvents] = useState([])
  const [refresh,setRefresh] = useState(false);
  const dispatch = useDispatch();
  const fetchData = async (url) => {
    try {
      const res = await axios.get(`${baseUrl}/event`)
      setEvents(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  console.log('events',events)
  useEffect(() => {
    fetchData()
  }, [refresh])

  const deleteEventHandler = async(eventId) => {

    try{
      const option = {
        url:'http://127.0.0.1:8080/event',
        method:'DELETE',
        data: {
          eventId:eventId
        }
      }
      const result = await axios(option)
      dispatch(handleOpenAlertLayer({message:result.data.message}))
      setRefresh(!refresh)
    }catch(err){
      console.log(err);
    }


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
          </tr>
          </thead>
          <tbody>
          {events.map((event, idx) => {
            return (
              <tr key={event?._id}>
                <td>{idx + 1}</td>
                <td>{event?.eventId}</td>
                <td>{event?.eventTitle}</td>
                <td>{parseDateToString(event?.eventStartDate)} ~ {parseDateToString(event?.eventEndDate)}</td>
                <td>
                <span className={styles.close__btn} onClick={() => deleteEventHandler(event?.eventId)}>
                  <AiFillCloseCircle style={{ width: '2rem', height: '2rem', fill: 'red' }} />
                </span>
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
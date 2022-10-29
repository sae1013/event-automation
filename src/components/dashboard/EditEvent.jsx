import React,{useEffect,useState} from 'react'
import axiosInstance from '../../utils/axios.js'
import {useHistory,useParams} from 'react-router-dom';
import EventForm from '../common/EventForm.jsx';
import { handleOpenAlertLayer } from '../../redux/slices/modalSlice.js'
import HashLoader from 'react-spinners/HashLoader'
import styles from '../../styles/dashboard/SearchEvent.module.scss'
function EditEvent(props) {
  const params = useParams();
  const history = useHistory();
  const [event,setEvent] = useState();
  const [isLoading,setIsLoading] = useState(true);

  const fetchData = async(eventId)=> {
    setIsLoading(true)
    try{
      const result = await axiosInstance.get(`/event/${eventId}`)
      setEvent(result.data)
    }catch (err) {
      dispatch(handleOpenAlertLayer({
        message: err.response.data.error
      }))
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData(params.id);
  },[])
  return (
    <>
    {isLoading
      ? <div className={styles.loading__wrap}>
          <p>이벤트를 불러오고 있습니다</p>
          <HashLoader color={"#1D1CE5"}/>
        </div>
      : <EventForm event={event}></EventForm>
    }
    </>
  )
}

export default EditEvent
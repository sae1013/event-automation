import React,{useEffect,useState} from 'react'
import axiosInstance from '../../utils/axios.js'
import {useHistory,useParams} from 'react-router-dom';
import EventForm from '../common/EventForm.jsx';
import { handleOpenAlertLayer } from '../../redux/slices/modalSlice.js'

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
      ? <div>Loading..</div>
      : <EventForm event={event}></EventForm>
    }
    </>
  )
}

export default EditEvent
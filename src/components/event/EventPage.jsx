import React,{useRef,useEffect,useState} from 'react'
import {Event130} from '../../utils/EventData';
import styles from '../../styles/event/EventPage.module.scss';

import {parseEventFooter} from '../../utils/parseUtil.js'
//third-party
import debounce from 'debounce';
import axios from 'axios';
const requestURL = 'https://localhost:8080/event/130'

// 절대좌표 -> 상대좌표로 환산 후 이미지맵 적용
function EventPage(props) {
  const [isLoading,setIsLoading] = useState(false);
  const [eventData,setEventData] = useState();
  const event = Event130;
  const imageRef = useRef();
  const areaRef = useRef();
  const [isImgLoaded,setIsImgLoaded] = useState(false);

  const fetchData = async() => {
    setIsLoading(true)
    try{
      const result = await axios.get(requestURL)
      setEventData(result.data);
      setIsLoading(false);
    }catch (e) {

    }


  }

  const getPosition = (posArr) => { // string -> int Array
    const ret = posArr.split(',')
    return ret.map((pos)=> parseFloat(pos))
  }
  const getImageMapCoord = () => {
    const intrinsicWidth = imageRef.current.naturalWidth;
    const intrinsicHeight = imageRef.current.naturalHeight;
    const renderedWidth = imageRef.current.clientWidth;
    const renderedHeight = imageRef.current.clientHeight;
    let coordString = event.eventArea.area1.coord
    let [absoluteX1,absoluteY1,absoluteX2,absoluteY2] = getPosition(coordString);
    const moduler = 10**4;
    let relativeX1 = Math.round((absoluteX1 * renderedWidth / intrinsicWidth)*moduler) / moduler // 상대좌표
    let relativeY1 = Math.round((absoluteY1 * renderedHeight / intrinsicHeight)*moduler) / moduler
    let relativeX2 = Math.round((absoluteX2 * renderedWidth / intrinsicWidth)*moduler) / moduler
    let relativeY2 = Math.round((absoluteY2 * renderedHeight / intrinsicHeight)*moduler) / moduler

    const coordArr = [relativeX1,relativeY1,relativeX2,relativeY2];
    const parsedCoordString = coordArr.join(",")
    return parsedCoordString;
  }

  const defaultCoords = '132.4229,338.5225,543.9648,417.8018';
  useEffect(() => {
    const resizeCallback = debounce(() => {
      areaRef.current.coords = getImageMapCoord()

    })

    return () => {
      window.removeEventListener('resize',resizeCallback);
    }
  },[])

  useEffect(() => {
    fetchData();
  },[])

  useEffect(() => {
    console.log(isImgLoaded);
    if(!isImgLoaded) return
    areaRef.current.coords = getImageMapCoord();
  },[isImgLoaded])
  // "132.4229,338.5225,543.9648,417.8018"

  if(isLoading) {
    return <div>Loading...</div>
  }

  return(
    <div className={styles.container}>

      <div className={styles.pageTitle}> 진행중인 이벤트 </div>
      <div className={styles.eventHeader}>
        <h1 className={styles.eventTitle}>{eventData?.eventTitle}</h1>
        <p className={styles.eventDate}>{`${eventData?.eventStartDate} ~ ${eventData?.eventEndDate}`}</p>
      </div>

      <div className={styles.eventWrapper}>
        <img onLoad = {() => setIsImgLoaded(true)} ref={imageRef} src ={eventData?.eventImageUrl} alt={"eventPage"} useMap={"#imageMap"}/>
        <map name={"imageMap"}>
          <area ref = {areaRef} shape="rect" alt="Computer"/>
        </map>
      </div>

      <div className={styles.eventFooter}>
        <p>이벤트 상세설명</p>
        <ul>
        {eventData?.eventFooter.map((description,idx) => {
          return (
            <li key = {idx}>
              <span>• {description}</span>
            </li>
          )
        })}
        </ul>
      </div>

    </div>
  )
}

export default EventPage;

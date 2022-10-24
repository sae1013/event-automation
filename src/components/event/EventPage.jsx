import React,{useRef,useEffect,useState} from 'react'
import {Event130} from '../../utils/EventData';
import styles from '../../styles/event/EventPage.module.scss';
import {useParams,useLocation} from 'react-router-dom';
//third-party
import debounce from 'debounce';
import axios from 'axios';
const requestURL = 'http://localhost:8080/event/130'

// 절대좌표 -> 상대좌표로 환산 후 이미지맵 적용
function EventPage(props) {
  const [isLoading,setIsLoading] = useState(false);
  const [eventData,setEventData] = useState();

  const imageRef = useRef();
  const areaRef = useRef();
  const [isImgLoaded,setIsImgLoaded] = useState(false);

  const params = useParams();

  const fetchData = async(eventId) => {
    setIsLoading(true)
    try{
      const result = await axios.get(`http://localhost:8080/event/${eventId}`)
      console.log(result)
      setEventData(result.data);
      setIsLoading(false);
    }catch (e) {

    }


  }

  const onClickAreaHandler = (e) => {
    const eventType = e.target.getAttribute('data-type');
    const eventContents = e.target.getAttribute('data-contents');
    switch(eventType) {
      case 'getCoupon':
        break
      case 'link':
        break
    }
    window.alert(eventContents)
  }

  const getPosition = (posArr) => { // string -> int Array
    const ret = posArr.split(',')
    return ret.map((pos)=> parseFloat(pos))
  }

  const getImageMapCoord = (coordString) => {
    const intrinsicWidth = imageRef.current.naturalWidth;
    const intrinsicHeight = imageRef.current.naturalHeight;
    const renderedWidth = imageRef.current.clientWidth;
    const renderedHeight = imageRef.current.clientHeight;
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

  useEffect(() => {

    const resizeCallback = debounce(() => {
      if(!isImgLoaded) return // 이미지 로드
      if(!eventData || eventData.eventArea.length === 0) return
      if(!areaRef.current) return

      const childNodes = areaRef.current.childNodes
      for(let i = 0 ; i<childNodes.length; i++){

        const childNodes = areaRef.current.childNodes;
        childNodes[i].coords = getImageMapCoord(eventData.eventArea[i].coordXY)
      }
    })

    window.addEventListener('resize',resizeCallback)

    return () => {
      window.removeEventListener('resize',resizeCallback);
    }
  },[eventData,areaRef.current,isImgLoaded])

  useEffect(() => {
    if(!params.id) {
      return
    }
    fetchData(params.id);
  },[params.id])

  useEffect(() => { // 이미지맵에 Area 적용
    if(!(eventData?.eventArea)){
      return
    }
    if(!isImgLoaded) return // 이미지 로드
    if(areaRef.current == null){ // 이미지맵 로드
      return
    }

    const childNodes = areaRef.current.childNodes;

    if(childNodes.length !== eventData.eventArea.length) {
      console.log('등록된 Area의 갯수와 이미지맵 Area의 갯수가 일치하지 않습니다.')
      return
    }

    for(let i = 0 ; i<childNodes.length; i++){
      childNodes[i].coords = getImageMapCoord(eventData.eventArea[i].coordXY)
    }

  },[isImgLoaded,areaRef.current,eventData])


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
        <map name={"imageMap"} ref = {areaRef}>
          {eventData?.eventArea.map((area,idx) => {
            return (
              <area key={idx} shape="rect" alt="eventBtn" data-type={area.eventType} data-contents={area.couponNumber} onClick={onClickAreaHandler}/>
            )
          })}
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

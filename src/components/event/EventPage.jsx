import React,{useRef,useEffect,useState} from 'react'
import {Event130} from '../../utils/EventData';
import styles from '../../styles/event/EventPage.module.scss';
import axios from 'axios';
//third-party
import debounce from 'debounce';
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
    const result = await axios.get(requestURL)

    console.log(result.data)
    setEventData(result.data);
    setIsLoading(false);

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
        <h1 className={styles.eventTitle}>웹툰 이벤트</h1>
        <p className={styles.eventDate}>2022.10.18~2022.10.29</p>
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
          <li>
            <span>• 이벤트 기간 : ~2022.11.20(일)</span>
          </li>
          <li>
            <span>• 쿠폰 유효기간 : 발급일로부터 20일 간</span>
          </li>
          <li>
            <span>• 본 이벤트는 에버랜드 이용 고객분들께 지급되는 쿠폰입니다.</span>
          </li>
        </ul>
      </div>

    </div>
  )
}

export default EventPage;

// 이벤트 기간 : ~2022.11.20(일)
// 쿠폰 유효기간 : 발급일로부터 20일 간
// 본 이벤트는 에버랜드 이용 고객분들께 지급되는 쿠폰입니다.
//   본 쿠폰은 ID 1개당 1회 발급 가능하며, 중복 사용이 불가합니다.
//   포토북 쿠폰은 8*8 사이즈 한정 및 2만원 이상 결제 시 사용할 수 있으며, 에버랜드 해피 할로윈 포토북에 한해 적용됩니다.
//   본 쿠폰은 혜택 적용 대상 상품 외 다른 상품 구매 시에는 사용하실 수 없습니다.
//   본 이벤트는 당사 사정에 따라 별도 고지없이 경품 변경 및 조기 종료 될 수 있습니다.
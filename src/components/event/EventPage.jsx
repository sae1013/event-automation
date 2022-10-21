import React,{useRef,useEffect} from 'react'
import {Event130} from '../../utils/EventData';
import styles from '../../styles/event/EventPage.module.scss';
// 절대좌표 -> 상대좌표로 환산 후 이미지맵 적용
function EventPage(props) {
  const event = Event130;
  const imageRef = useRef();
  const areaRef = useRef();

  const getPosition = (posArr) => { // string -> int Array
    const ret = posArr.split(',')
    return ret.map((pos)=> parseFloat(pos))
  }
  const buttonHandler = () => {
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
    // console.log(absoluteX1,absoluteY1,absoluteX2,absoluteY2);
    // console.log(relativeX1,relativeY1,relativeX2,relativeY2)
    const coordArr = [relativeX1,relativeY1,relativeX2,relativeY2];
    const parsedCoordString = coordArr.join(",")
    return parsedCoordString;
    // console.log(parsedCoordString);
  }

  useEffect(() => {
    console.log(areaRef.current.coords)
    areaRef.current.coords = buttonHandler();
    console.log(areaRef.current)
  },[])
  // "132.4229,338.5225,543.9648,417.8018"
  return(
    <div className={styles.container}>
      <div className={styles.eventWrapper}>
        <img ref={imageRef} src ={event.eventImageUrl} alt={"eventPage"} useMap={"#imageMap"}/>
        <map name={"imageMap"}>
          <area ref = {areaRef} shape="rect" coords={"132.4229,338.5225,543.9648,417.8018"} alt="Computer" onClick={buttonHandler}/>
        </map>
      </div>
    </div>
  )
}

export default EventPage;


import React,{useState,useEffect} from 'react'
import styles from '../../styles/home/Home.module.scss'
import {OPEN,PENDING,CLOSED} from '../../utils/constant_variable.js';
import axiosInstance from '../../utils/axios.js';
import dayjs from 'dayjs'
import {parseDateToString} from '../../utils/parseUtil.js';
import {useHistory} from 'react-router-dom';

function Home(props) {
  const [category,setCategory] = useState(OPEN);
  const [events,setEvents] = useState([]);
  const [filteredEvents,setFilteredEvents] = useState([]);
  const history = useHistory();
  const handleCategory = (e) => {

    const selectedCategory = e.target.getAttribute('data-index')
    if(!selectedCategory) return;
    setCategory(selectedCategory)

  }

  const onClickEventHandler = (eventId) => {
    history.push(`/event/${eventId}`)
  }

  const fetchData = async() => {
    try{
      const res = await axiosInstance.get('/event')
      setEvents(res.data);
    }catch(err){
      console.log(err)
    }

  }
  useEffect(() => {
    fetchData()
  },[]);

  useEffect(() => {
    if(events.length === 0) return
    const currentTime = dayjs();
    let filtered = [];
    switch(category) {
      case OPEN:
        filtered = events.filter(event => {
          if(currentTime.isAfter(dayjs(event.eventStartDate)) && currentTime.isBefore(dayjs(event.eventEndDate)) ){
            return true
          }
        })
        break
      case CLOSED:
        filtered = events.filter(event => {
          if(currentTime.isAfter(dayjs(event.eventEndDate))){
           return true
          }
        })
        break
      case PENDING:
        filtered = events.filter(event => {
          if(currentTime.isBefore(dayjs(event.eventStartDate))){
            return true
          }
        })
    }
    setFilteredEvents(filtered)
  },[category,events])

  return (
    <div className={styles.container}>
      <section className={styles.top__banner}>
        <div className={styles.left}>
          <h3 className={styles.intro__title}>
            이벤트 페이지생성을 자동화 할 수 있습니다
          </h3>
          <p className={styles.intro__description}
             dangerouslySetInnerHTML={{ __html: '이벤트 제너레이터는 이벤트페이지 생성을 자동화하는 프로젝트 입니다.<br/> 마케터, 디자이너가 이벤트를 직접 등록하면 이미지맵을 적용한 인터랙티브한 페이지가 생성됩니다<br/>개발자의 퍼블리싱 작업을 최소화 해보세요' }}></p>
        </div>
        <div className={styles.right}>
          <div className={styles.info__box}>
            <div className={styles.info__box__item}>
              <div className={styles.info__box__item__top}>
                <span>90</span>
                <span>%</span>
              </div>
              <div className={styles.info__box__item__bottom}>
                <span dangerouslySetInnerHTML={{__html:'이벤트 페이지 퍼블리싱<br/>소요시간 단축률'}}></span>
              </div>
            </div>
            <div className={styles.seperator__horizontal}></div>
            <div className={styles.info__box__item}>
              <div className={styles.info__box__item__top}>
                <span>100</span>
                <span>%</span>
              </div>
              <div className={styles.info__box__item__bottom}>
                <span dangerouslySetInnerHTML={{__html:'이벤트 페이지 내 반응형 <br/>브라우저 리사이징 지원'}}></span>
              </div>
            </div>

          </div>
        </div>
      </section>
      <section className={styles.category}>
        <ul onClick={handleCategory}>
          <li data-index = {OPEN} className={category === OPEN ? styles.active:''}>진행중인 이벤트</li>
          <li data-index = {CLOSED} className={category === CLOSED ? styles.active:''}>종료된 이벤트</li>
          <li data-index = {PENDING} className={category === PENDING ? styles.active:''}>예정된 이벤트</li>
        </ul>
      </section>
      <section className={styles.event}>
        <h1 className={styles.section__title}>{category ===OPEN ? '진행중인 이벤트':category ===CLOSED ?'종료된 이벤트':'예정된 이벤트'}</h1>
        <ul className={styles.card__list}>
          {filteredEvents.map((event) => {
            return (
              <li key= {event.eventId} className={styles.card__item} onClick={() => onClickEventHandler(event.eventId)}>
                <div className={styles.top}>
                  <div className={styles.image__wrap}>
                    <img src={event.eventKeyVisualImageUrl} />
                  </div>
                </div>
                <div className={styles.bottom}>
                  <h3 className={styles.title}>{event.eventTitle}</h3>
                  <p className={styles.date}>{`${parseDateToString(event.eventStartDate)} ~ ${parseDateToString(event.eventEndDate)}`}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </section>


    </div>
  )
}

export default Home

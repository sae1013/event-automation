import React from 'react'
import styles from '../../styles/home/Home.module.scss'

function Home(props) {
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
        <ul>
          <li className={styles.active}>진행중인 이벤트</li>
          <li>종료된 이벤트</li>
        </ul>
      </section>
      <section className={styles.event}>
        <h1 className={styles.section__title}>진행중인 이벤트</h1>
        <ul className={styles.card__list}>
          <li className={styles.card__item}>
            <div className={styles.top}>
              <div className={styles.image__wrap}>
                <img src={'https://event-maker1.s3.ap-northeast-2.amazonaws.com/pages/event2.jpeg'} />
              </div>
            </div>
            <div className={styles.bottom}>
              <h3 className={styles.title}>이벤트 이름</h3>
              <p className={styles.date}>이벤트기간</p>
            </div>
          </li>
          <li className={styles.card__item}>
            <div className={styles.top}>
              <div className={styles.image__wrap}>
                <img src={'https://event-maker1.s3.ap-northeast-2.amazonaws.com/pages/event2.jpeg'} />
              </div>
            </div>
            <div className={styles.bottom}>
              <h3 className={styles.title}>이벤트 이름</h3>
              <p className={styles.date}>이벤트기간</p>
            </div>
          </li>
          <li className={styles.card__item}>
            <div className={styles.top}>
              <div className={styles.image__wrap}>
                <img src={'https://event-maker1.s3.ap-northeast-2.amazonaws.com/pages/event2.jpeg'} />
              </div>
            </div>
            <div className={styles.bottom}>
              <h3 className={styles.title}>이벤트 이름</h3>
              <p className={styles.date}>이벤트기간</p>
            </div>
          </li>
        </ul>
      </section>


    </div>
  )
}

export default Home

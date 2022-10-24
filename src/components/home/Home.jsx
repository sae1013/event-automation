import React from 'react'
import styles from '../../styles/home/Home.module.scss'

function Home(props) {
  return (
    <div className={styles.container}>
      <section className={styles.top__banner}>
        <div className={styles.left}>
          asd
        </div>
        <div className={styles.right}>
          asd
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
                <img src={"https://event-maker1.s3.ap-northeast-2.amazonaws.com/pages/event2.jpeg"}/>
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
                <img src={"https://event-maker1.s3.ap-northeast-2.amazonaws.com/pages/event2.jpeg"}/>
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
                <img src={"https://event-maker1.s3.ap-northeast-2.amazonaws.com/pages/event2.jpeg"}/>
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

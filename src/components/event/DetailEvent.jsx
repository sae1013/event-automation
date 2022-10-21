import React,{useRef} from 'react';
import styles from '../../styles/event/EnrollEvent.module.scss';
import {AiFillInfoCircle} from 'react-icons/ai';
import {BsBook} from 'react-icons/bs';

function EnrollEvent(props) {
  const imageRef = useRef();

  function fileHandler(e) {
    let reader = new FileReader()
    console.log(e.target.files[0])
    const file = e.target.files[0]
    if (file) {
      reader.readAsDataURL(file)
      reader.onloadend = function(src) {
        console.log(src.currentTarget.result)
        const targetImageSrc = imageRef.current.childNodes[0]
        console.log('dd',targetImageSrc);
        targetImageSrc.src = src.currentTarget.result
      }
    }
  }
  const submitHandler = (e) => {
    e.preventDefault();

  }
  return (
    <div className={styles.container}>
      {/*<div className={styles.floating}>*/}
      {/*  <ul>*/}
      {/*    <li className={styles.floating__item}>*/}
      {/*      <BsBook style={{width:'20px',height:'20px',fill:'#7895B2'}}></BsBook>*/}
      {/*      <span>튜토리얼</span>*/}
      {/*    </li>*/}
      {/*    <li className={styles.floating__item}>*/}
      {/*      <AiFillInfoCircle style={{width:'20px',height:'20px',fill:'#FF8787'}}></AiFillInfoCircle>*/}
      {/*      <span>신규알림</span>*/}
      {/*    </li>*/}
      {/*  </ul>*/}
      {/*</div>*/}
      <p className={styles.header}>이벤트 등록</p>

      <section className={styles.event__image}>
        <p className={styles.tutorial1}>1. 이벤트 페이지 전체를 등록해주세요</p>
        <input type={'file'} accept={'image/*'} id='event-image' name='evnet-image'
               onChange={(event) => fileHandler(event)}>
        </input>
        <div ref={imageRef} className={styles.preview__image}>
          <img/>
        </div>
        <button className={styles.btn__rndBox}>사이즈측정 켜기</button>
        <button className={styles.btn__rndBox}>사이즈측정 끄기</button>
      </section>
      <section className={styles.event__info}>
        <p className={styles.tutorial1}>2. 이벤트 정보를 입력하세요</p>
        <form className={styles.hookForm} onSubmit={submitHandler}>
          <div>
            <label>이벤트 이름</label>
            <input type="text"/>
          </div>

          <div>
            <label>이벤트 시작날짜</label>
            <input type="calendar"/>
          </div>

          <div>
            <label>이벤트 종료날짜</label>
            <input type="calendar"/>
          </div>

          <div>
            <label>이벤트 푸터 (이벤트 하단)</label>
            <input type="calendar"/>
          </div>
          <div>
            <button className={styles.btn__eventAdd}>영역 추가</button>
          </div>
          <div className={styles.coord__box}>
            <div>
              <p>영역1</p>
              <div>
                <label>쿠폰번호</label>
                <input type={"text"}/>
              </div>
              <div>
                <label>이벤트 타입</label>
                <input type={"text"}/>
              </div>
              <div>
                <label>좌표(x,y)</label>
                <input></input>
              </div>
            </div>
            <div>
              <p>영역1</p>
              <div>
                <label>쿠폰번호</label>
                <input type={"text"}/>
              </div>
              <div>
                <label>이벤트 타입</label>
                <input type={"text"}/>
              </div>
              <div>
                <label>좌표(x,y)</label>
                <input></input>
              </div>
            </div>
            <div>
              <p>영역1</p>
              <div>
                <label>쿠폰번호</label>
                <input type={"text"}/>
              </div>
              <div>
                <label>이벤트 타입</label>
                <input type={"text"}/>
              </div>
              <div>
                <label>좌표(x,y)</label>
                <input></input>
              </div>
            </div>
          </div>

          <button type={"submit"} className={styles.btn__submitForm}>이벤트 생성</button>
        </form>

      </section>
    </div>
  )
}

export default EnrollEvent
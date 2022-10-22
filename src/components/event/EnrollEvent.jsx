import React, { useRef,useState } from 'react'
import styles from '../../styles/event/EnrollEvent.module.scss'
import { AiFillInfoCircle } from 'react-icons/ai'
import { BsBook } from 'react-icons/bs'
import { useForm } from 'react-hook-form'
import {Rnd} from 'react-rnd';

function EnrollEvent(props) {
  const imageRef = useRef()
  const RndRef = useRef();
  const [showRnd,setShowRnd] = useState(false);

  function fileHandler(e) {
    let reader = new FileReader()
    // console.log(e.target.files[0])
    const file = e.target.files[0]
    if (file) {
      reader.readAsDataURL(file)
      reader.onloadend = function(src) {
        console.log(src.currentTarget.result)
        const targetImageSrc = imageRef.current.childNodes[0]
        console.log('dd', targetImageSrc)
        targetImageSrc.src = src.currentTarget.result
      }
    }
  }

  const submitHandler = (data) => {
    console.log('data',data)
    const formData = {
      ...data
    }

    // 이벤트 이미지 로드
    const imageElement = imageRef.current.childNodes[0];
    if(!imageElement){
      // 에러 모달 띄워주기
      console.error('이벤트 이미지가 없습니다')
      return
    }
    console.dir(imageElement);



  }

  const coordHandler = () => {
    // 이미지 사이즈 구하기
    const imageElement = imageRef.current.childNodes[0];
    const intrinsicWidth = imageElement.naturalWidth;
    const intrinsicHeight = imageElement.naturalHeight;
    const renderedWidth = imageElement.clientWidth;
    const renderedHeight = imageElement.clientHeight;

    let posX1 = RndRef.current.draggable.state.x
    let posY1 = RndRef.current.draggable.state.y
    let boxWidth = RndRef.current.resizable.state.width
    let boxHeight = RndRef.current.resizable.state.height
    let posX2 = posX1+boxWidth;
    let posY2 = posY1+boxHeight;
    const moduler = 10**4

    const absoluteX1 = Math.round((intrinsicWidth * posX1 / renderedWidth)*moduler) / moduler;
    const absoluteY1 = Math.round((intrinsicHeight * posY1 / renderedHeight)*moduler) / moduler;
    const absoluteX2 = Math.round((intrinsicWidth * posX2 / renderedWidth)*moduler) / moduler;
    const absoluteY2 = Math.round((intrinsicHeight * posY2 / renderedHeight)*moduler) / moduler;
    console.log(absoluteX1,absoluteY1,absoluteX2,absoluteY2);
    const ret = `x1:${absoluteX1},y1:${absoluteY1},x2:${absoluteX2},y2:${absoluteY2}`
    window.alert(ret)
  }

  const { register, handleSubmit, onBlur, formState: { errors }, setError } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',

  })
  console.log(errors)
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
          <img src={"https://event-maker1.s3.ap-northeast-2.amazonaws.com/pages/placeholder-image.png"}/>
          {showRnd && <Rnd
            className={"react-draggable-custom"}
            ref = {RndRef}
            onClick={()=>{}}
            default={{
              x: 200,
              y: 200,
              width: 300,
              height: 100,

            }}
            // minWidth={100}
            // minHeight={100}
            bounds="parent"
          >
            {/* <Box /> */}
          </Rnd>}
        </div>
        <button className={styles.btn__rndBox} onClick={()=>setShowRnd(true)}>사이즈측정 켜기</button>
        <button onClick = {coordHandler} className={styles.btn__rndBox}>좌표값 확인</button>
        <button className={styles.btn__rndBox} onClick={()=>setShowRnd(false)}>사이즈측정 끄기</button>
      </section>
      <section className={styles.event__info}>
        <p className={styles.tutorial2}>2. 이벤트 정보를 입력하세요</p>
        <form className={styles.hookForm} onSubmit={handleSubmit(submitHandler)}>
          <div>
            <label>이벤트 이름</label>
            {errors?.eventName && <p className={styles.form__errors}>{errors.eventName.message}</p>}
            <input type='text' {...register('eventName', {
              required: '필수 입력값',
              minLength: { value: 1, message: '최소 1글자 이상' },
            })} />
          </div>

          <div>
            <label>이벤트 시작날짜</label>
            {errors?.eventStartDate && <p className={styles.form__errors}>{errors.eventStartDate.message}</p>}
            <input type='text' {...register('eventStartDate', {
              required: '필수 입력값',
              minLength: { value: 1, message: '최소 1글자 이상' },
            })} />
          </div>

          <div>
            <label>이벤트 종료날짜</label>
            {errors?.eventEndDate && <p className={styles.form__errors}>{errors.eventEndDate.message}</p>}
            <input type='text' {...register('eventEndDate', {
              required: '필수 입력값',
              minLength: { value: 1, message: '최소 1글자 이상' },
            })} />
          </div>

          <div>
            <label>이벤트 푸터 (이벤트 하단)</label>
            {errors?.eventFooter && <p className={styles.form__errors}>{errors.eventFooter.message}</p>}
            <input type='text' {...register('eventFooter', {
              required: '필수 입력값',
              minLength: { value: 1, message: '최소 1글자 이상' },
            })} />
          </div>
          <div>
            <button className={styles.btn__eventAdd}>영역 추가</button>
          </div>
          <div className={styles.coord__box}>
            <div>
              <p>영역1</p>
              <div>
                <label>쿠폰번호</label>
                {errors?.couponNumber && <p className={styles.form__errors}>{errors.couponNumber.message}</p>}
                <input type='text' {...register('couponNumber', {
                  required: '필수 입력값',
                  minLength: { value: 1, message: '최소 1글자 이상' },
                })} />
              </div>
              <div>
                <label>이벤트 타입</label>
                {errors?.eventType && <p className={styles.form__errors}>{errors.eventType.message}</p>}
                <input type='text' {...register('eventType', {
                  required: '필수 입력값',
                  minLength: { value: 1, message: '최소 1글자 이상' },
                })} />
              </div>
              <div>
                <label>좌표(x,y)</label>
                {errors?.coordXY && <p className={styles.form__errors}>{errors.coordXY.message}</p>}
                <input type='text' {...register('coordXY', {
                  required: '필수 입력값',
                  minLength: { value: 1, message: '최소 2글자 이상' },
                })} />
              </div>
            </div>

          </div>

          <button type={'submit'} className={styles.btn__submitForm}>이벤트 생성</button>
        </form>

      </section>
    </div>
  )
}

export default EnrollEvent
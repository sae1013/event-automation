import React, { useRef } from 'react'
import styles from '../../styles/event/EnrollEvent.module.scss'
import { AiFillInfoCircle } from 'react-icons/ai'
import { BsBook } from 'react-icons/bs'
import { useForm } from 'react-hook-form'

function EnrollEvent(props) {
  const imageRef = useRef()

  function fileHandler(e) {
    let reader = new FileReader()
    console.log(e.target.files[0])
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

    }
    // 이벤트 이미지 로드
    const imageElement = imageRef.current.childNodes[0];
    if(!imageElement){
      // 에러 모달 띄워주기
      console.error('이벤트 이미지가 없습니다')
      return
    }
    console.log('이미지',imageElement.src)


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
          <img />
        </div>
        <button className={styles.btn__rndBox}>사이즈측정 켜기</button>
        <button className={styles.btn__rndBox}>사이즈측정 끄기</button>
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
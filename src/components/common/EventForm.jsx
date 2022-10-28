import React, { useRef, useState, useEffect } from 'react'
import styles from '../../styles/dashboard/EnrollEvent.module.scss'
import { useForm } from 'react-hook-form'
import { Rnd } from 'react-rnd'
import { parseSpaceString } from '../../utils/parseUtil.js'
import { AiFillCloseCircle } from 'react-icons/ai'
import axiosInstance from '../../utils/axios.js'
import dayjs from 'dayjs'
import { useHistory } from 'react-router-dom'
import { handleOpenAlertLayer } from '../../redux/slices/modalSlice.js'
import { useDispatch } from 'react-redux'

const parseArrayToString = (array,seperator) => {
  return array.join(seperator)
}

function EventForm(props) {
  const history = useHistory()
  const dispatch = useDispatch()
  const imageRef = useRef()
  const bannerImageRef = useRef();
  const RndRef = useRef()
  const initialCoordBox = Array.from(Array(props.event.eventArea.length),(val,idx)=>idx)
  const [showRnd, setShowRnd] = useState(false)
  const [coordBox, setCoordBox] = props.event.eventArea.length > 0 ? useState(initialCoordBox) : useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false)

  const defaultFormValue = {
    eventId:props.event.eventId,
    eventTitle:props.event.eventTitle,
    eventStartDate:dayjs(props.event.eventStartDate).format('YYYY-MM-DD'),
    eventEndDate:dayjs(props.event.eventEndDate).format('YYYY-MM-DD'),
    eventFooter: parseArrayToString(props.event.eventFooter,'\n'),

  }

  props.event.eventArea.map((area,idx) => {
    defaultFormValue[`coordXY-${idx}`] = area.coordXY;
    defaultFormValue[`couponNumber-${idx}`] = area.couponNumber;
    defaultFormValue[`eventType-${idx}`] = area.eventType;

  })

  const { register, handleSubmit, onBlur, formState: { errors }, setError } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues : defaultFormValue
  })

  useEffect(() => { // 첫 렌더링 될때 이미지맵영역의 field를 생성해주어야함.
    imageRef.current.childNodes[0].src = props.event.eventImageUrl
    bannerImageRef.current.childNodes[0].src = props.event.eventKeyVisualImageUrl
  },[])

  useEffect(() => {
    if (!RndRef.current) {
      return
    }
    window.scroll({ top: imageRef.current.offsetTop - 50, behavior: 'smooth' })
  }, [showRnd])

  function fileHandler(e) { // 데이터 없으면 default이미지로 돌릴 수있도록 코드 보강해야함
    let reader = new FileReader()
    const file = e.target.files[0]

    if (file) {
      reader.readAsDataURL(file)
      reader.onloadend = function(src) {
        const targetImageSrc = imageRef.current.childNodes[0]
        targetImageSrc.src = src.currentTarget.result
      }
    }
  }

  function keyVisualFileHandler(e) {
    let reader = new FileReader()
    const file = e.target.files[0]
    console.log(e.target)
    if (file) {
      reader.readAsDataURL(file)
      reader.onloadend = function(src) {
        const targetImageSrc = bannerImageRef.current.childNodes[0]
        console.log(targetImageSrc)
        targetImageSrc.src = src.currentTarget.result
      }
    }
  }

  const addCoordBoxHandler = (e) => {
    e.preventDefault()
    if (coordBox.length === 0) {
      setCoordBox([0])
      return
    }
    setCoordBox([...coordBox, coordBox[coordBox.length - 1] + 1])

  }

  const removeCoordBoxHandler = (e) => {
    const deleteId = parseInt(e.target.parentNode.getAttribute('data-index'))
    console.log(deleteId)
    const filtered = coordBox.filter((id) => id !== deleteId)
    setCoordBox(filtered)
  }

  const submitHandler = async(data) => {
    register("eventId",{value:'object'})
    console.log('suibmintg')
    console.log(data);

    // 이벤트 영역 데이터 뽑기
    const eventArea = []
    for (let i = 0; i < coordBox.length; i++) {
      const newArea = {}
      newArea[`eventType`] = data[`eventType-${coordBox[i]}`]
      newArea[`couponNumber`] = data[`couponNumber-${coordBox[i]}`]
      newArea[`coordXY`] = data[`coordXY-${coordBox[i]}`]

      eventArea.push(newArea)
    }

    const formData = new FormData()
    formData.append('eventId', data.eventId)
    formData.append('eventTitle', data.eventTitle)
    formData.append('eventStartDate', new Date(data.eventStartDate))
    formData.append('eventEndDate', new Date(data.eventEndDate))
    formData.append('eventArea', JSON.stringify(eventArea))
    formData.append('eventFooter', JSON.stringify(parseSpaceString(data.eventFooter)))
    formData.append('eventImageUrl', data.eventPageImage[0])
    formData.append('eventKeyVisualImageUrl', data.keyvisualImage[0])

    const options = {
      method: 'POST',
      // headers: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
      data: formData,
      url: `/event/edit`,
    }
    try {
      setIsSubmitting(true)
      const result = await axiosInstance(options)

      dispatch(handleOpenAlertLayer({
        message: '이벤트 수정이<br/>완료되었습니다', confirmCallback: () => {
          history.push(`/event/${props.event.eventId}`)
        },
      }))


    } catch (err) {
      dispatch(handleOpenAlertLayer({
        message: err.response.data.error
      }))
    }
    setIsSubmitting(false)
  }

  const coordHandler = () => {
    // 이미지 사이즈 구하기
    if (!RndRef.current) return
    const imageElement = imageRef.current.childNodes[0]
    const intrinsicWidth = imageElement.naturalWidth
    const intrinsicHeight = imageElement.naturalHeight
    const renderedWidth = imageElement.clientWidth
    const renderedHeight = imageElement.clientHeight

    let posX1 = RndRef.current.draggable.state.x
    let posY1 = RndRef.current.draggable.state.y
    let boxWidth = RndRef.current.resizable.state.width
    let boxHeight = RndRef.current.resizable.state.height
    let posX2 = posX1 + boxWidth
    let posY2 = posY1 + boxHeight
    const moduler = 10 ** 4

    const absoluteX1 = Math.round((intrinsicWidth * posX1 / renderedWidth) * moduler) / moduler
    const absoluteY1 = Math.round((intrinsicHeight * posY1 / renderedHeight) * moduler) / moduler
    const absoluteX2 = Math.round((intrinsicWidth * posX2 / renderedWidth) * moduler) / moduler
    const absoluteY2 = Math.round((intrinsicHeight * posY2 / renderedHeight) * moduler) / moduler
    console.log(absoluteX1, absoluteY1, absoluteX2, absoluteY2)
    const ret = `${absoluteX1},${absoluteY1},${absoluteX2},${absoluteY2}`

    window.alert(ret)
  }
  console.log(errors)

  return (
    <div className={styles.container}>
      <p className={styles.header}>이벤트 수정</p>
      <section className={styles.event__image}>
        <p className={styles.tutorial1}>1. 이벤트 페이지 전체를 등록해주세요</p>
        {<p className={styles.form__info}>기존과 동일한 이미지 사용시 새로 업로드 하지않아도 됩니다.</p>}
        <input type={'file'} accept={'image/*'}
               {...register('eventPageImage', {

               })}
               onChange={(event) => fileHandler(event)}>
        </input>
        <div ref={imageRef} className={styles.preview__image}>
          <img src={'https://event-maker1.s3.ap-northeast-2.amazonaws.com/pages/placeholder-image.png'} />
          {showRnd && <Rnd
            className={styles.react_draggable_custom}
            ref={RndRef}
            onClick={() => {
            }}
            default={{
              x: 0,
              y: 0,
              width: 300,
              height: 100,
            }}
            // minWidth={100}
            // minHeight={100}
            bounds='parent'
          />}
        </div>
        <button className={styles.btn__rndBox} onClick={() => setShowRnd(true)}>사이즈측정 켜기</button>
        <button onClick={coordHandler} className={styles.btn__rndBox}>좌표값 확인</button>
        <button className={styles.btn__rndBox} onClick={() => setShowRnd(false)}>사이즈측정 끄기</button>
      </section>
      <section className={styles.event__keyvisual}>

        <p>2. 이벤트 키비주얼(배너) 이미지를 등록하세요.</p>
        {<p className={styles.form__info}>기존과 동일한 이미지 사용시 새로 업로드 하지않아도 됩니다.</p>}
        <input type={'file'} accept={'image/*'}
               name='event-image' {...register('keyvisualImage', {

        }) }onChange={(event) => keyVisualFileHandler(event)}>
        </input >
        <div ref={bannerImageRef} className={styles.preview__image}>
          <img src={'https://event-maker1.s3.ap-northeast-2.amazonaws.com/pages/placeholder-image.png'} />
        </div>
      </section>

      <section className={styles.event__info}>
        <p className={styles.tutorial2}>3. 이벤트 정보를 입력하세요</p>
        <form className={styles.hookForm} onSubmit={handleSubmit(submitHandler)}>
          <div>
            <label>이벤트 고유번호 <span className={styles.form__errors}>(수정불가)</span></label>
            {errors?.eventId && <p className={styles.form__errors}>{errors.eventId.message}</p>}
            <input disabled type='text' {...register('eventId', {
              required: '필수 입력값',
              minLength: { value: 1, message: '최소 1글자 이상' },
            })} />
          </div>
          <div>
            <label>이벤트 제목</label>
            {errors?.eventTitle && <p className={styles.form__errors}>{errors.eventTitle.message}</p>}
            <input type='text' {...register('eventTitle', {
              required: '필수 입력값',
              minLength: { value: 1, message: '최소 1글자 이상' },
            })} />
          </div>

          <div>
            <label>이벤트 시작날짜</label>
            {errors?.eventStartDate && <p className={styles.form__errors}>{errors.eventStartDate.message}</p>}
            <input type='date' {...register('eventStartDate', {
              // required: '필수 입력값',
              // minLength: { value: 1, message: '최소 1글자 이상' },
            })} />
          </div>

          <div>
            <label>이벤트 종료날짜</label>
            {errors?.eventEndDate && <p className={styles.form__errors}>{errors.eventEndDate.message}</p>}
            <input type='date' {...register('eventEndDate', {
              // required: '필수 입력값',
              // minLength: { value: 1, message: '최소 1글자 이상' },
            })} />
          </div>

          <div>
            <label>이벤트 푸터 (이벤트 하단)</label>
            {errors?.eventFooter && <p className={styles.form__errors}>{errors.eventFooter.message}</p>}
            <textarea type='text' {...register('eventFooter')} />
          </div>
          <div>
            <button className={styles.btn__eventAdd} onClick={addCoordBoxHandler}>영역 추가</button>
          </div>
          {/* 하단 영역 박스*/}
          <div className={styles.coord__box}>
            {coordBox.map((index) => { //index가 곧 key
              return (
                <div key={index} className={styles.coord__item}>
                  <span className={styles.closeBtn} data-index={index} onClick={removeCoordBoxHandler}>
                    <AiFillCloseCircle data-index={index}
                                       style={{ width: '30px', height: '30px', fill: '#d63031' }}></AiFillCloseCircle>
                  </span>
                  <p>{`이미지맵 영역`}</p>
                  <div>
                    <label>이벤트 타입</label>
                    {/*{errors[`eventType-${id}`] && <p className={styles.form__errors}>{errors[`eventType-${id}`].message}</p>}*/}
                    <select name='event-type' {...register(`eventType-${index}`)}>
                      <option value={'getCoupon'}>쿠폰받기</option>
                      <option value={'link'}>링크이동</option>
                    </select>
                  </div>
                  <div>
                    <label>쿠폰번호 or 링크</label>
                    {errors[`couponNumber-${index}`] &&
                      <p className={styles.form__errors}>{errors[`couponNumber-${index}`].message}</p>}
                    <input type='text' {...register(`couponNumber-${index}`, {
                      required: '필수 입력값',
                      minLength: { value: 1, message: '최소 1글자 이상' },
                    })} />
                  </div>

                  <div>
                    <label>좌표(x,y)</label>
                    {errors[`coordXY-${index}`] &&
                      <p className={styles.form__errors}>{errors[`coordXY-${index}`].message}</p>}
                    <input type='text' {...register(`coordXY-${index}`, {
                      required: '필수 입력값',
                      minLength: { value: 1, message: '최소 2글자 이상' },
                    })} />
                  </div>
                </div>
              )
            })}

          </div>

          <button type={'submit'} className={styles.btn__submitForm}>
            {isSubmitting ? '잠시만 기다려주세요':'이벤트 생성'}
          </button>
        </form>

      </section>
    </div>
  )
}

export default EventForm
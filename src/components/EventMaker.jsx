import React, {useState} from 'react'
import styled from'styled-components';
import { useForm } from 'react-hook-form';

const Container = styled.div`
  min-width:1140px;
  padding-bottom: 200px;
  background-color: lightblue;
  min-height: 100vh;
`;

const Title = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  padding-top: 30px;
  padding-bottom: 30px;
  
`;

const ImageWrap = styled.div`
  width: 90%;
  margin-left: 5%;
  >img {
    width: 100%;
  }
`;

const Contents = styled.div`
  padding-top: 20px;
  border-radius: 20px;
  border: 1px solid black;
  width: 90%;
  margin-left: 5%;
  display: flex;
  //flex-direction: column;
  //align-items: center;
  
  .hook-form {
      > div {
        margin-bottom: 10px;
        
        > label {
          display: block;
          margin-bottom: 2px;
        }
        
      }
      input {
        padding: 20px 10px;
        width: 90%;
        border: 1px solid grey;
        border-radius: 10px;
      }
    
  }
`
const Left = styled.div`
  width: 50%;  
  margin-left: 10px;
`
const Right = styled.div`
  width: 50%;
`

function EventMaker(props) {
  const { register, handleSubmit,watch, formState: { errors } } = useForm();
  // console.log('error',errors)

  const onSubmit = data => {
    console.log(data)
    // console.log(errors)
  }
  const [eventKey,setEventKey] = useState([]);
  const [num,setNum] = useState(0);

  const addHandler = () => {
    setEventKey([...eventKey,num+1])
    setNum(num+1)
  }
  const onDelete = (e) => {
    const targetKey = e.target.getAttribute('data-index')
    const filteredKey = eventKey.filter((key) => {
      return key != targetKey
    })
    console.log(filteredKey)
    setEventKey(filteredKey)
  }

  return (
    <Container>
      <Title>Enroll Event</Title>
      <ImageWrap>
        <img src={"public/web3.png"}/>
      </ImageWrap>

      <Contents>
        <form className={"hook-form"} onSubmit={handleSubmit(onSubmit)}>
          <Left>

              <div>
                <label>이벤트명</label>
                <input {...register("eventName", {required:true,minLength: 5})}
                       aria-invalid={errors.eventName ? "true" : "false"}
                />
              </div>
              <div>
                <label>이벤트 시작날짜</label>
                <input {...register("eventStartDate", {required:true,})}/>
              </div>

              <div>
                <label>이벤트 종료날짜</label>
                <input {...register("eventEndDate", {required:true,})}/>
              </div>

              <div>
                <label>이벤트 설명</label>
                <input {...register("eventDescription", {required:true,})}/>
              </div>

              <button onClick={addHandler}>이벤트 추가하기</button>
              <button type={'submit'}>제출</button>

          </Left>
          <Right>
            {eventKey.map((key) => {
              return (
                <div className={"hook-form"}>
                  <p>영역1</p>
                  <div>
                    <label>쿠폰번호</label>
                    <input {...register(`section${key}_couponNumber`, {required:true,})}/>
                  </div>
                  <div>
                    <label>좌표</label>
                    <input {...register(`section${key}_coord`, {required:true,})}/>
                  </div>
                  <div>
                    <button onClick={onDelete} data-index={key}>삭제</button>
                  </div>
                </div>
              )
            })}
          </Right>
        </form>
      </Contents>



    </Container>
  )
}

export default EventMaker
import dayjs from 'dayjs';

export const parseSpaceString = (str) => {
  if(str.length === 0) return [];
  let splited = str.split('\n');
  if(splited[splited.length-1] === ""){
    splited.pop();
  }
  return splited;

}

export const parseDateToString = (date) => {
  return dayjs(date).format('YYYY-MM-DD')
}
export const getEventState = (event) => {
  let currentTime = dayjs();
  let state = 'OPEN';

  if(currentTime.isAfter(dayjs(event.eventStartDate)) && currentTime.isBefore(dayjs(event.eventEndDate)) ){
    state = 'OPEN'  
    
  }
  else if(currentTime.isAfter(dayjs(event.eventEndDate))){
    state = 'CLOSED'
    
  }
  else if(currentTime.isBefore(dayjs(event.eventStartDate))) {
    state = 'PENDING'
    
  }
  return state
}


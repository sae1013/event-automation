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
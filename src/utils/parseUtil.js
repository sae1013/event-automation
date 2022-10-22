
export const parseSpaceString = (str) => {
  let splited = str.split('\n');
  if(splited[splited.length-1] === ""){
    splited.pop();
  }
  return splited;

}
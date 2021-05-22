const values = [];

function valueJoin(id, username, room, selectedValue) {

  const index = values.findIndex(value => value.id === id);

  if(index == -1){
    const value = {id, username, room, selectedValue};
    values.push(value);
    return value;
  }
  else{
    const value = values.splice(index, 1)[0];
    value.selectedValue = selectedValue;
    values.push(value)
    return value;
  }
}

function getAllValuesInARoom(room){
  const answer = values.filter(value => value.room === room);
  console.log(answer);
  return answer;
}

function removeValue(id) {
  const index = values.findIndex(value => value.id === id);

  if(index != -1){
    return values.splice(index, 1)[0];
  }
}

function removeAllValuesInARoom(room){

  const answer = values.filter(value => value.room === room);

  console.log(answer);
  for(let i = 0; i < answer.length; i++){
    const index = values.indexOf(answer[i]);
    if (index > -1) {
      values.splice(index, 1);
    }
  }
  return answer;

}

module.exports = {
  valueJoin,
  getAllValuesInARoom,
  removeValue,
  removeAllValuesInARoom
};
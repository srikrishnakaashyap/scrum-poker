const values = [];

function valueJoin(id, username, room, selectedValue) {

  const value = {id, username, room, selectedValue};

  values.push(value);

  return value;
}

function getAllValuesInARoom(room){
  return values.filter(value => value.room === room);
}

function removeValue(id) {
  const index = values.findIndex(value => value.id === id);

  if(index != -1){
    return values.splice(index, 1)[0];
  }
}

module.exports = {
  valueJoin,
  getAllValuesInARoom,
  removeValue
};
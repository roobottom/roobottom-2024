module.exports = (obj) => {
  let str = ''
  for (const key in obj) {
    //add to the returned string, as long as a value is passed in the object:
    if (obj[key] != undefined) {str += ` ${key}="${obj[key]}"`}
  }
  return str
}
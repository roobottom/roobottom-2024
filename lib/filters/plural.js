module.exports = (noun, count, suffix="s") => {
  return `${noun}${count !== 1 ? suffix: ''}`
}
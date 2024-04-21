module.exports = html => {
  var regexp = RegExp(/(^.*?[a-z]{2,}[.!?])\s+\W*/, 'm')
  return (regexp.exec(html) === null) ? html : regexp.exec(html)[0]
}
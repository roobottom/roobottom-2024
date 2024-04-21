//https://fossheim.io/writing/posts/eleventy-similar-posts/
const getSimilartags = function (tagsA, tagsB) {
  return tagsA.filter(Set.prototype.has, new Set(tagsB)).length;
}

module.exports = (collection, path, tags) => {
  if (tags === undefined) return null
  return collection.filter((post) => {
    if (post.data.tags === undefined) return null
    return getSimilartags(post.data.tags, tags) >= 1 && post.data.page.inputPath !== path;
  }).sort((a, b) => {
    return getSimilartags(b.data.tags, tags) - getSimilartags(a.data.tags, tags);
  })
}
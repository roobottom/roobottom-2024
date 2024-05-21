//https://fossheim.io/writing/posts/eleventy-similar-posts/
const getSimilartags = function (tagsA, tagsB) {
  return tagsA.filter(Set.prototype.has, new Set(tagsB)).length;
}

module.exports = (collection, currentSlug, tags) => {
  if (tags === undefined) return null
  // return collection.filter((post) => {
  //   if (post.data.tags === undefined) return null
  //   return getSimilartags(post.tags, tags) >= 1 && post.slug !== currentSlug;
  // }).sort((a, b) => {
  //   return getSimilartags(b.tags, tags) - getSimilartags(a.tags, tags);
  // })
}
const { URL } = require("url");

module.exports = (webmentions, page) => {
  const url = new URL(page, "https://roobottom.com/").toString();

  const allowedTypes = {
    likes: ["like-of"],
    reposts: ["repost-of"],
    comments: ["mention-of", "in-reply-to"],
  };

  const clean = (entry) => {
    if (entry.content) {
      if (entry.content.text.length > 280) {
        entry.content.value = `${entry.content.text.substr(0, 280)}&hellip;`;
      } else {
        entry.content.value = entry.content.text;
      }
    }
    return entry;
  };

  

  const cleanedWebmentions = webmentions
    .filter((mention) => mention['wm-target'] === url)
    .sort((a, b) => new Date(b.published) - new Date(a.published))
    .map(clean);

  const likes = cleanedWebmentions
    .filter((mention) => allowedTypes.likes.includes(mention["wm-property"]))
    .filter((like) => like.author)
    .map((like) => like.author);

  const reposts = cleanedWebmentions
    .filter((mention) => allowedTypes.reposts.includes(mention["wm-property"]))
    .filter((repost) => repost.author)
    .map((repost) => repost.author);

  const comments = cleanedWebmentions
    .filter((mention) => allowedTypes.comments.includes(mention["wm-property"]))
    .filter((comment) => {
      const { author, published, content } = comment;
      return author && author.name && published && content;
    });

  return {
    likes,
    reposts,
    comments,
  };
}
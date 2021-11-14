module.exports = (response) => {
  let postsWithoutDuplicates = [];
  for (const tagPosts of response) {
    postsWithoutDuplicates = [...new Set([...postsWithoutDuplicates, ...tagPosts.data.posts])];
  }
  return postsWithoutDuplicates;
};

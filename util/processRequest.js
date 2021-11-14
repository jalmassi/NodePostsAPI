module.exports = (response) => {
  let postsWithoutDuplicates = [];
  for (const tagPosts of response) {
    postsWithoutDuplicates = [...new Set([...postsWithoutDuplicates, ...tagPosts.data.posts])];
  }
  //   sort(postsWithoutDuplicates, direction, sortBy);
  return postsWithoutDuplicates;
};

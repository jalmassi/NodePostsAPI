const global = require("./global");

module.exports = async (tagRequests, params) => {
  const tags = params.tag.split(",");
  console.log(`${params.tag} - ${params.sortBy} - ${params.direction}`);
  for (const tag of tags) {
    tagRequests.push(await global.axiosInstance.get(``, { params: { tag: tag, sortBy: params.sortBy, direction: params.direction } }));
  }
};

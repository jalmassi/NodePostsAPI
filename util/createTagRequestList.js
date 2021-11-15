const global = require("./global");

module.exports = async (tagRequests, params) => {
  console.log(params.tag);
  const tags = params.tag.replace(/%2C/g, ",").split(",");
  for (const tag of tags) {
    tagRequests.push(await global.axiosInstance.get(``, { params: { tag: tag, sortBy: params.sortBy, direction: params.direction } }));
  }
};

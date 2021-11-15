module.exports = (objArray, direction, sortBy) => {
  if (direction === "desc") {
    objArray.sort((first, second) => second[sortBy] - first[sortBy]);
  } else if (direction === "asc") {
    objArray.sort((first, second) => first[sortBy] - second[sortBy]);
  } else {
    throw new Error("direction is invalid");
  }
};

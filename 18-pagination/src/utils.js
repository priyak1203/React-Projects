export const paginate = (followers) => {
  const itemsPerPage = 10;
  const noOfPages = Math.ceil(followers.length / itemsPerPage);

  const newFollowers = Array.from({ length: noOfPages }, (_, index) => {
    const start = index * itemsPerPage;
    return followers.slice(start, start + itemsPerPage);
  });
  return newFollowers;
};

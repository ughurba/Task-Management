export const getUserToken = () => {
  const userToken = window.localStorage.getItem("userToken");
  return userToken;
};

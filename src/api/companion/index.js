import instance from "../index";

export const getCompanionList = () => {
  return instance({
    method: "GET",
    url: "/h5/companion",
  });
};

export const createOrder = (data) => {
  return instance({
    method: "POST",
    url: "/createOrder",
    data,
  });
};

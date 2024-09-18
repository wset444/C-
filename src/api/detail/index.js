import instance from "../index";

export const getDetail = (params) => {
  return instance({
    method: "GET",
    url: "/order/detail",
    params,
  });
};

import instance from "../index";

export const orderList = (params) => {
  return instance({
    method: "GET",
    url: "/order/list",
    params,
  });
};

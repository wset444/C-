import instance from "../index";

export const getHomeInfo = (params) => {
  return instance({
    method: "GET",
    url: "/Index/index",
    params,
  });
};

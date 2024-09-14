import instance from "../index";

export const login = (data) => {
  return instance({
    method: "post",
    url: "/login",
    data,
  });
};

// export default {
//   login(data) {
//     return instance.post("/login", data);
//   },
// };

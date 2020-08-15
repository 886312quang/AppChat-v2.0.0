import api from "../api/api";

const services = {
  getCurrentUser: async () => {
    const response = await api.get("/user/current");
    return response;
  },
  listFriend: async ({ term }) => {
    let url = "/user";
    url = term ? url + `?term=${term}` : url;
    const response = await api.get(url);
    return response;
  },
};

export default services;

import api from "../api/api";

const services = {
  getListFriend: async ({ type }) => {
    const response = await api.get(`/contact/?type=${type}`);
    return response;
  },
};

export default services;

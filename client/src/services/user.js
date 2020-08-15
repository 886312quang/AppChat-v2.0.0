import api from "../api/api";

const services = {
  getCurrentUser: async () => {
    const response = await api.get("/user/current");
    return response;
  },
};

export default services;

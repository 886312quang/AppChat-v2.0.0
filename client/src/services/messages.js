import api from "../api/api";

const services = {
  getList: async ({ groupSkip = 0, personSkip = 0 }) => {
    const response = await api.get(
      `/message/read-more-all-chat?skipPersonal=${personSkip}&skipGroup=${groupSkip}`,
    );
    return response;
  },
};

export default services;

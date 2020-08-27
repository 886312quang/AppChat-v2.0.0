import api from "../api/api";

const services = {
  getList: async ({ groupSkip = 0, personSkip = 0 }) => {
    const response = await api.get(
      `/message/read-more-all-chat?skipPersonal=${personSkip}&skipGroup=${groupSkip}`,
    );
    return response;
  },
  createNewMessage: async (info) => {
    const response = await api.post("/message", info);
    return response;
  },
  createNewMessageImages: async (info) => {
    const response = await api.post("/message/add-new-images", info);
    return response;
  },
  createNewMessageFiles: async (info) => {
    const response = await api.post("/message/add-new-files", info);
    return response;
  },
};

export default services;

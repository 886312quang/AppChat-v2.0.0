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
  deleteList: async (info) => {
    const response = await api.post("/message/delete-list", info);
    return response;
  },
  listImageFn: async ({ id, skip = 0, limit = 9, type }) => {
    const response = await api.get(
      `/message/list?id=${id}&skip=${skip}&limit=${limit}&type=${type}`,
    );
    return response;
  },
  listFileFn: async ({ id, skip = 0, limit = 9, type }) => {
    const response = await api.get(
      `/message/listFile?id=${id}&skip=${skip}&limit=${limit}&type=${type}`,
    );
    return response;
  },
  readMore: async ({ id, skip, limit }) => {
    const response = await api.get(
      `/message/read-more?id=${id}&skip=${skip}&limit=${limit}`,
    );
    return response;
  },
};

export default services;

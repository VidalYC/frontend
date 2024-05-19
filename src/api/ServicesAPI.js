import api from "../lib/axios";

export default {
  all() {
    return api.get("/services");
  },
  create(data) {
    return api.post("/services", data);
  },
  update(id, data) {
    return api.put(`/services/${id}`, data);
  },
  delete(id) {
    return api.delete(`services/${id}`);
  },
};

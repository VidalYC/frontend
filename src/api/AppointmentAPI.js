import api from "../lib/axios";

export default {
  create(data) {
    return api.post("/appointments", data);
  },
  getByDate(date) {
    return api.get(`/appointments?date=${date}`);
  },
  getUserAppointments(userId) {
    return api.get(`/users/${userId}/appointments`);
  },
  getUsersAppointmentsCompleted(userId) {
    return api.get(`/users/${userId}/appointments/completed`);
  },
  getById(id) {
    return api.get(`appointments/${id}`);
  },
  update(id, data) {
    return api.put(`/appointments/${id}`, data);
  },
  delete(id) {
    return api.delete(`/appointments/${id}`);
  },
  completed(id) {
    return api.put(`/appointments/${id}/completed`);
  },
  sendMessage(id, data) {
    return api.post(`/appointments/${id}`, data);
  },
};

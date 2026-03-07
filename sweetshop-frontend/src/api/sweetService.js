import API from "./api";

export const getAllSweets = () => {
  return API.get("/sweets?page=0&size=10");
};
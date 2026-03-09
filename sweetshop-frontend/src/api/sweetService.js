import API from "./api";

/* ==============================
   Get All Sweets
================================ */

export const getAllSweets = async (page = 0, size = 50) => {

  const { data } = await API.get("/sweets", {
    params: { page, size }
  });

  // Spring Boot Page response -> use content
  return data.content || [];

};


/* ==============================
   Get Sweet By ID
================================ */

export const getSweetById = async (id) => {

  const { data } = await API.get(`/sweets/${id}`);

  return data;

};


/* ==============================
   Search Sweets
================================ */

export const searchSweets = async (keyword) => {

  const { data } = await API.get("/sweets/search", {
    params: { keyword }
  });

  return data;

};


/* ==============================
   Get Sweets By Category
================================ */

export const getSweetsByCategory = async (category) => {

  const { data } = await API.get("/sweets/category", {
    params: { category }
  });

  return data;

};


/* ==============================
   Add Sweet (Admin)
================================ */

export const addSweet = async (sweetData) => {

  const { data } = await API.post("/sweets", sweetData);

  return data;

};


/* ==============================
   Update Sweet (Admin)
================================ */

export const updateSweet = async (id, sweetData) => {

  const { data } = await API.put(`/sweets/${id}`, sweetData);

  return data;

};


/* ==============================
   Delete Sweet (Admin)
================================ */

export const deleteSweet = async (id) => {

  const { data } = await API.delete(`/sweets/${id}`);

  return data;

};


/* ==============================
   Update Sweet Rating
================================ */

export const updateSweetRating = async (id, rating) => {

  const { data } = await API.put(`/sweets/${id}/rating`, {
    rating
  });

  return data;

};
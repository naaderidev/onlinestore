import apiRequest from "../configs";

export const getMainBrand = async (brandId) => {
  return await apiRequest.get(`/brands/${brandId}`);
};

export const getMainCategory = async (categoryId) => {
  return await apiRequest.get(`/categories/${categoryId}`);
};

import { httpClient, jsonContentType } from '../../api';

const baseUrl = '/categories';

async function getCategories(params = {}) {
  return httpClient.get(baseUrl, { params });
}

async function createCategory(data) {
  return httpClient.post(baseUrl, data, { headers: jsonContentType });
}

async function updateCategory(categoryId, data, options) {
  return httpClient.put(`${baseUrl}/${categoryId}`, data, { headers: jsonContentType, params: options });
}

async function deleteCategory(categoryId) {
  return httpClient.delete(`${baseUrl}/${categoryId}`);
}

async function searchCategories(data) {
  return httpClient.post(`${baseUrl}/search`, data);
}

async function getCategoriesAnalytics() {
  return httpClient.get(`${baseUrl}/analytics`);
}

export default { getCategories, createCategory, updateCategory, deleteCategory, searchCategories, getCategoriesAnalytics };

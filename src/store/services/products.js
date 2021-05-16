import { httpClient, jsonContentType } from '../../api';

const baseUrl = '/products';

async function getProducts(params = {}) {
  return httpClient.get(baseUrl, { params });
}

async function createProduct(data) {
  return httpClient.post(baseUrl, data, { headers: jsonContentType });
}

async function updateProduct(productId, data, options) {
  return httpClient.put(`${baseUrl}/${productId}`, data, { headers: jsonContentType, params: options });
}

async function deleteProduct(productId) {
  return httpClient.delete(`${baseUrl}/${productId}`);
}

async function searchProducts(data) {
  return httpClient.post(`${baseUrl}/search`, data);
}

async function getProductsAnalytics() {
  return httpClient.get(`${baseUrl}/analytics`);
}

export default { getProducts, createProduct, updateProduct, deleteProduct, searchProducts, getProductsAnalytics };

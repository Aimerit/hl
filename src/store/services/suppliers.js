import { httpClient, jsonContentType } from '../../api';

const baseUrl = '/suppliers';

async function getSuppliers(params = {}) {
  return httpClient.get(baseUrl, { params });
}

async function createSupplier(data) {
  return httpClient.post(baseUrl, data, { headers: jsonContentType });
}

async function updateSupplier(supplierId, data) {
  return httpClient.put(`${baseUrl}/${supplierId}`, data, { headers: jsonContentType });
}

async function deleteSupplier(supplierId) {
  return httpClient.delete(`${baseUrl}/${supplierId}`);
}

async function searchSuppliers(data) {
  return httpClient.post(`${baseUrl}/search`, data);
}

async function getSuppliersAnalytics() {
  return httpClient.get(`${baseUrl}/analytics`);
}

export default { getSuppliers, createSupplier, updateSupplier, deleteSupplier, searchSuppliers, getSuppliersAnalytics };

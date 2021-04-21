import { httpClient, jsonContentType } from '../../api';

async function getSuppliers() {
  return httpClient.get('/suppliers');
}

async function createSupplier(supplierData) {
  return httpClient.post('/suppliers', supplierData, { headers: jsonContentType });
}

async function updateSupplier(supplierId, supplierData) {
  return httpClient.put(`/suppliers/${supplierId}`, supplierData, { headers: jsonContentType });
}

async function deleteSupplier(supplierId) {
  return httpClient.delete(`/suppliers/${supplierId}`);
}

export default { getSuppliers, createSupplier, updateSupplier, deleteSupplier };

function isSupplierDeletable(supplier = {}) {
  return supplier.productsCount === 0;
}

export default { isSupplierDeletable };

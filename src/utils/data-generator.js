import faker from 'faker';

function generateSuppliers() {
  return Array(30)
    .fill()
    .map(() => ({
      key: faker.random.uuid(),
      uuid: faker.random.uuid(),
      createdAt: faker.date.soon(),
      companyName: faker.company.companyName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      address: faker.address.streetAddress(true)
    }));
}

function generateText() {
  return faker.lorem.text();
}

export default { generateSuppliers, generateText };

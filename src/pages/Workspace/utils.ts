import { faker } from "@faker-js/faker";

// Three possible statues
const statuses = ["TODO", "In Progress", "Complete"];

// Five random group names
const groups = Array.from({ length: 5 }, faker.word.adjective);

// Creates a single product
const productFactory = () => {
  return {
    name: faker.commerce.product(),
    productType: faker.commerce.productMaterial(),
    score: faker.datatype.number({ min: 0, max: 100 }),
    manufacturer: faker.company.name(),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    groups: faker.helpers.uniqueArray(groups, Math.floor(Math.random() * 3)),
  };
};

export default productFactory;

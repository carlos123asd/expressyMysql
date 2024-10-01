import { faker } from '@faker-js/faker';
import Employee from '../interfaces/Employee';

export function createRandomEmployee():Employee {
  return {
    id: faker.string.uuid(),
    photo: faker.image.avatar(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    startdate: faker.date.recent(),
    description: faker.word.words(),
    phone: faker.phone.number(),
    status: faker.helpers.arrayElement(['inactive', 'active'])
  };
}

export const employeeFaker = faker.helpers.multiple(createRandomEmployee, {
  count: 10,
});
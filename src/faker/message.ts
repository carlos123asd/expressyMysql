import { faker } from '@faker-js/faker';
import Message from '../interfaces/Message';

export function createRandomMessage():Message {
  return {
    id: faker.string.uuid(),
    date: faker.date.soon(),
    customer: faker.person.firstName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    reason: faker.word.words(),
    comment: faker.word.words(),
    status: faker.helpers.arrayElement(['none', 'archived', 'published'])
  };
}

export const messageFaker = faker.helpers.multiple(createRandomMessage, {
  count: 10,
});
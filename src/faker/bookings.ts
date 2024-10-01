import { faker } from '@faker-js/faker';
import Booking from '../interfaces/Booking';

export function createRandomBooking():Booking {
  return {
    id: faker.string.uuid(),
    guest: faker.person.fullName(),
    orderDate: faker.date.recent(),
    checkin: faker.date.past(),
    timein: faker.date.anytime(),
    checkout: faker.date.future(),
    timeout: faker.date.anytime(),
    ordertime: faker.date.anytime(),
    specialRequest: faker.word.words(),
    roomType: faker.helpers.arrayElement(['Suite', 'Double Superior', 'Double Bed', 'Single Bed']),
    status: faker.helpers.arrayElement(['Available', 'Booked']),
    idRoom: faker.helpers.arrayElement(['1','2','3','4','5','6','7','8','9','10']),
  };
}

export const bookingFaker = faker.helpers.multiple(createRandomBooking, {
  count: 10,
});
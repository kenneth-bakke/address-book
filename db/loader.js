const { faker } = require('@faker-js/faker');
const promisePool = require('../db/index');
const { contacts } = require('../server/models/');
const MAX_CONTACTS = 100;

function createRandomContact() {
  const name = createPerson();
  return {
    firstName: name[0],
    lastName: name[1],
    phoneNumber: name[2],
    email: createEmail(),
    address: createAddress(),
  };
}

function createAddress() {
  let streetInfo = faker.address.streetAddress();
  streetInfo = streetInfo.split(' ');
  const address = {
    street_number: streetInfo.shift(),
    street_name: streetInfo.join(' '),
    city: faker.address.city(),
    state: faker.address.stateAbbr(),
    country: faker.address.country(),
    zipcode: faker.address.zipCode(),
  };
  return JSON.stringify(address);
}

function createPerson() {
  return [
    faker.name.firstName(),
    faker.name.lastName(),
    faker.phone.phoneNumberFormat(),
  ];
}

function createEmail() {
  return faker.internet.email();
}

promisePool
  .getConnection()
  .then((connection) => {
    for (let i = 0; i < MAX_CONTACTS; i++) {
      const person = createRandomContact();
      contacts.createContact(person, (e) => {
        if (e) console.error(e);
        else console.log(`Added ${person}`);
      });
    }
    connection.release();
    return;
  })
  .catch((e) => console.error(e));

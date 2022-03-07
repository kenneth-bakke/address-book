const db = require('../../db/index');

module.exports = {
  getContacts: async function (cb) {
    const queryString = `SELECT P.first_name, P.last_name, E.email_address FROM person P JOIN email E ON P.id = E.person_id;`;
    try {
      const res = await db.query(queryString);
      cb(null, res[0]);
    } catch (e) {
      cb(e, null);
    }
  },
  createContact: async function (contactInfo, cb) {
    const { firstName, lastName, email, address } = contactInfo;
    const addr = JSON.parse(address);
    const { street_number, street_name, city, us_state, country, zipcode } =
      addr;
    const personQuery = `INSERT IGNORE INTO person (first_name, last_name) VALUES (?, ?);`;

    const emailQuery = `INSERT IGNORE INTO email (email_address, person_id)
        VALUES (?, (SELECT id FROM person WHERE first_name = ? AND last_name = ?));`;

    const addressQuery = `INSERT IGNORE INTO address (street_number, street_name, city, us_state, country, zipcode, owner_id)
        VALUES (?, ?, ?, ?, ?, ?, (SELECT id FROM person WHERE first_name = ? AND last_name = ?));`;

    const personArgs = [firstName, lastName];
    const emailArgs = [email, firstName, lastName];
    const addressArgs = [
      street_number,
      street_name,
      city,
      us_state,
      country,
      zipcode,
      firstName,
      lastName,
    ];

    try {
      db.query(personQuery, personArgs);
      db.query(emailQuery, emailArgs);
      db.query(addressQuery, addressArgs);
      cb(null, 'Posted');
    } catch (e) {
      cb(e, null);
    }
  }, // TODO
  editContact: function () {}, // TODO
  deleteContact: function () {}, // TODO
};

const { query } = require('../../db/index');
const db = require('../../db/index');

module.exports = {
  getContacts: async function (params, cb) {
    let { pageCount, page } = params;
    if (!pageCount) pageCount = 5;
    if (!page) page = 1;
    const queryString = `SELECT P.id, P.first_name, P.last_name, E.email_address,
                          JSON_OBJECT(
                            'street_number', A.street_number,
                            'street_name', A.street_name,
                            'city', A.city,
                            'state', A.state,
                            'country', A.country,
                            'zipcode', A.zipcode
                          )
                          AS address FROM person P
                            JOIN email E ON P.id = E.person_id
                            JOIN address A ON P.id = A.owner_id
                          GROUP BY P.id
                          LIMIT ${pageCount}
                          OFFSET ${(page - 1) * pageCount};
                          `;
    try {
      const res = await db.query(queryString);
      if (res[0]?.length > 0) {
        cb(null, res[0]);
      } else {
        cb('Out of bounds', null);
      }
    } catch (e) {
      cb(e, null);
    }
  },
  createContact: async function (contactInfo, cb) {
    const { firstName, lastName, email, address } = contactInfo;
    const addr = JSON.parse(address);
    const { street_number, street_name, city, state, country, zipcode } = addr;
    const personQuery = `
      INSERT IGNORE INTO person (first_name, last_name)
        VALUES (?, ?);
    `;

    const emailQuery = `
      INSERT IGNORE INTO email (email_address, person_id)
        VALUES (?, (SELECT id FROM person WHERE first_name = ? AND last_name = ?));
    `;

    const addressQuery = `
      INSERT IGNORE INTO address (street_number, street_name, city, state, country, zipcode, owner_id)
        VALUES (?, ?, ?, ?, ?, ?, (SELECT id FROM person WHERE first_name = ? AND last_name = ?));
    `;

    const personArgs = [firstName, lastName];
    const emailArgs = [email, firstName, lastName];
    const addressArgs = [
      street_number,
      street_name,
      city,
      state,
      country,
      zipcode,
      firstName,
      lastName,
    ];

    try {
      db.query(personQuery, personArgs);
      db.query(emailQuery, emailArgs);
      db.query(addressQuery, addressArgs);
      cb(null);
    } catch (e) {
      cb(e);
    }
  },
  editContact: async function (contactInfo, contactId, cb) {
    if (!contactId) cb('Contact does not exist');

    const { firstName, lastName, email, address } = contactInfo;
    const { street_number, street_name, city, state, country, zipcode } =
      address;

    const queryString = `UPDATE IGNORE person, email, address
      SET person.first_name=?,
      person.last_name=?,
      email.email_address=?,
      address.city=?,
      address.state=?,
      address.country=?,
      address.zipcode=?,
      address.street_name=?,
      address.street_number=?
    WHERE person.id = ${contactId}
    AND person.id = email.person_id
    AND person.id = address.owner_id`;

    const queryArgs = [
      firstName,
      lastName,
      email,
      city,
      state,
      country,
      zipcode,
      street_name,
      street_number,
    ];

    if (this.contactExists(contactId)) {
      try {
        await db.query(queryString, queryArgs);
        cb(null);
      } catch (e) {
        cb(e);
      }
    } else {
      cb('Contact does not exist');
    }
  },
  deleteContact: function () {}, // TODO
  contactExists: async function (contactId) {
    try {
      const contact = await db.query(
        `SELECT * FROM person WHERE id = ${contactId}`
      );
      if (contact[0]?.length <= 0) return false;
      else return true;
    } catch (e) {
      return false;
    }
  },
};

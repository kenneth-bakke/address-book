const { contacts } = require('../models/');

module.exports = {
  getContacts: function (req, res) {
    contacts.getContacts(req.query, (e, people) => {
      if (e) res.sendStatus(404);
      else res.status(200).send(people);
    });
  },
  createContact: function (req, res) {
    console.log(req.params);
    const contactInfo = req.query;
    contacts.createContact(contactInfo, (e) => {
      if (e) res.sendStatus(404);
      else res.status(201).send('Contact added');
    });
  },
  editContact: function (req, res) {
    const contactInfo = req.body;
    const { contact_id } = req.params;
    contacts.editContact(contactInfo, Number(contact_id), (e) => {
      if (e) res.status(404).send(e);
      else res.sendStatus(201);
    });
  },
  deleteContact: function (req, res) {
    res.status(200);
  },
};

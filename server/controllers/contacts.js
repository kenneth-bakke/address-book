const { contacts } = require('../models/');

module.exports = {
  getContacts: function (req, res) {
    contacts.getContacts((e, people) => {
      if (e) res.sendStatus(404);
      console.log(people);
      res.status(200).send(people);
    });
  },
  createContact: function (req, res) {
    const contactInfo = req.query;
    contacts.createContact(contactInfo, (e, message) => {
      if (e) res.sendStatus(400);
      res.status(201).send(message);
    });
    res.status(200);
  },
  editContact: function (req, res) {
    res.status(200);
  },
  deleteContact: function (req, res) {
    res.status(200);
  },
};

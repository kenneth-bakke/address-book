const { contacts } = require('../models/');

module.exports = {
  getContacts: function (req, res) {
    contacts.getContacts(req.query, (e, people) => {
      if (e) {
        res.sendStatus(404);
      } else {
        console.log(`GET 200`);
        res.status(200).send(JSON.stringify(people));
      }
    });
  },
  createContact: function (req, res) {
    const contactInfo = req.body;
    if (Object.keys(contactInfo).length > 0) {
      contacts.createContact(contactInfo, (e) => {
        if (e) {
          res.sendStatus(404);
        } else {
          console.log(`POST 201`);
          res.status(201).send('Contact added');
        }
      });
    } else {
      res.sendStatus(404);
    }
  },
  editContact: function (req, res) {
    const contactInfo = req.body;
    const { contact_id } = req.params;
    contacts.editContact(contactInfo, Number(contact_id), (e) => {
      if (e) {
        res.sendStatus(404);
      } else {
        res.status(201).send('Contact updated');
      }
    });
  },
  deleteContact: function (req, res) {
    const { contact_id } = req.params;
    contacts.deleteContact(Number(contact_id), (e) => {
      if (e) {
        res.sendStatus(404);
      } else {
        res.status(204).send('Contact deleted');
      }
    });
  },
};

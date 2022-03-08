const router = require('express').Router();
const { contacts } = require('../controllers/');

router.get('/contacts', contacts.getContacts);
router.post('/contacts', contacts.createContact);
router.put('/contacts/:contact_id', contacts.editContact);

module.exports = router;

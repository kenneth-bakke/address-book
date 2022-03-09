const router = require('express').Router();
const path = require('path');
const { contacts } = require('../controllers/');

router.get('', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});
router.get('/contacts', contacts.getContacts);
router.post('/contacts', contacts.createContact);
router.put('/contacts/:contact_id', contacts.editContact);
router.delete('/contacts/:contact_id/delete', contacts.deleteContact);

module.exports = router;

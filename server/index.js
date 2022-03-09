const express = require('express');
const cors = require('cors');
const path = require('path');
const router = require('./routes/routes.js');
const PORT = 8000;

const app = express();

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

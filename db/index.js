const mysql2 = require('mysql2');

const pool = mysql2.createPool({
  host: 'address-book-1.cfgdjcaaw7wk.us-west-2.rds.amazonaws.com',
  port: 3306,
  user: 'admin',
  password: '',
  database: 'address_book',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const promisePool = pool.promise();
const database_name = 'address_book';
promisePool
  .getConnection()
  .then((connection) => {
    const res = connection.query(
      `CREATE DATABASE IF NOT EXISTS ${database_name}`
    );
    connection.release();
    return res;
  })
  .then((res) => {
    console.log(`Connected to MySQL database ${database_name}`);
    return;
  })
  .catch((e) => {
    console.log(e);
  });

module.exports = promisePool;

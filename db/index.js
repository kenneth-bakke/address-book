const mysql2 = require('mysql2');
const fs = require('fs');

const pool = mysql2.createPool({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
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
  })
  .catch((e) => {
    console.log(e);
  });

module.exports = promisePool;

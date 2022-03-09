const http = require('k6/http');
const { sleep } = require('k6');
const baseURL = require('../api/api.js');

export const options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m30s', target: 10 },
    { duration: '20s', target: 0 },
  ],
};

export default function () {
  const params = {
    pageCount: 5,
    page: 1,
  };

  http.get(`${baseURL}contacts`, params);
  sleep(1);
}

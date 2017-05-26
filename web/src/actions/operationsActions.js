//import * as types from './actionTypes';
const Request = require('superagent');

export function postOperation(url) {
  return dispatch => {
    return new Promise(function (resolve, reject) {
      Request
        .post(`http://localhost:3000/transaction`)
        .send(url)
        .end((err, res) => {
          if (err) {
            return reject(err);
          }
          return resolve(res.body);
        });
    });
  };
}

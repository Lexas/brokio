//import * as types from './actionTypes';
const Request = require('superagent');

export function postOperation(url) {
  debugger;
  return dispatch => {
    return new Promise(function (resolve, reject) {
      Request
        .post(`https://requestb.in/1kyyxik1?inspect`)
        .send(url)
        .withCredentials()
        .end(function (err, res) {
          if (err) {
            return reject(err);
          }
          return resolve(res.url);
        });
    });
  };
}

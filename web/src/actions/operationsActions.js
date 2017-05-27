//import * as types from './actionTypes';
const Request = require('superagent');

export function postOperation(state) {
  return dispatch => {
    return new Promise(function (resolve, reject) {
      Request
        .post(createUrlFromState(state))
        .send({ operations: state.operations })
        .end((err, res) => {
          if (err) {
            return reject(err);
          }
          return resolve(res.body);
        });
    });
  };
}

function createUrlFromState(state) {
  return `http://localhost:3000/brokers/${state.brokerName}/transactions/${state.transactionName}`;
}

function createPayload(state) {
  return { operations: [{ name: state.name, requestUrl: state.operationUrl, method: state.method }]};
}


const Promise = require('bluebird');
const http = require('../util/http');
const _ = require('lodash');
const jp = require('../util/jsonPath');

coroutine = Promise.coroutine;

exports.run = (op, store) => {
  return coroutine(function* gen() {
    const state = _.cloneDeep(store);
    state[op.name] = {};
    const requestUrl = jp.interpolate(op.requestUrl, state);
    const response = yield http.request(op.method, requestUrl);
    state[op.name].res = response;
    const out = jp.map(state, op.outputMap);

    return {
      res: response,
      out,
    };
  })();
};



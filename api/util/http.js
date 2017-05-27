
var request = require('request-promise');
var jp = require('../util/jsonPath');

var sa = require('superagent');

exports.request = (method, url, body) => {
    return request({
      uri: url,
      method,
      body: body,
      headers: {
          'User-Agent': 'brokio',
          'Accept': 'application/json'
      },
      json: true,
    });
};



var request = require('request-promise');
var jp = require('../util/jsonPath');

exports.request = (method, url) => {
    return request({
      uri: url,
      method,
      headers: {
          'User-Agent': 'brokio',
          'Accept': 'application/json'
      },
      json: true,
    });
};
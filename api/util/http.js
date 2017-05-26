
var request = require('request-promise');

exports.request = (method, url) => {
    return request({
      uri: url,
      method,
      headers: {
          'User-Agent': 'brokio',
          'Accept': 'application/json'
      }
    });
};
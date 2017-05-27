
const jp = require('jsonpath');
const _ = require('lodash');

exports.map = (data, mapping) => {
  const out = {};

  _.forOwn(mapping, (val, key) => {
    out[key] = jp.query(data, `$.${val}`)[0];
  });

  return out;
};

exports.interpolate = (value, store) => {
  const replacementRegex = new RegExp(/\{{2}([^}]*)\}{2}/, 'g');
  return value.replace(replacementRegex, (match, submatch) => {
    return jp.query(store, `$.${submatch}`)[0];
  });
};
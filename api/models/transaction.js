var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var types = Schema.Types;

schema = new mongoose.Schema({
  brokerName: String,
  brokerId: types.ObjectId,
  transactionName: String,
  transactionId: types.ObjectId,
  operations: [
    {
      name: String,
      requestUrl: String, 
      requestBodyMap: Object,
      method: String,
      outputMap: Object,
    },
  ],
  endpointUrl: String,
});

module.exports = mongoose.model('transaction', schema)
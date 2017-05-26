var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var types = Schema.Types;

schema = new mongoose.Schema({
    broker: String,
    brokerId: types.ObjectId,
    transactionName: String,
    transactionId: types.ObjectId,
    processes: [
        {
            name: String,
            requestUrl: String, 
        }
    ],
    endpointUrl: String 
});

module.exports = mongoose.model('transaction', schema)
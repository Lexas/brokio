const Promise = require('bluebird');
const operation = require('./operation');

coroutine = Promise.coroutine;

exports.run = (transaction) => {
  return coroutine(function* gen(){
    const store = {};
    const operations = transaction.operations;
    for(op of operations) {
      const operationResult = yield operation.run(op, store);
      
      store[op.name] = operationResult; 
    };
    const lastOperation = operations[operations.length - 1];
    output = store[lastOperation.name].out;

    return output;
  })();
};
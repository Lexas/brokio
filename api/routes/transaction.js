
var express = require('express');
var Transaction = require('../models/transaction');
var http = require('../util/http');

var router = express.Router();

router.route('/brokers/:brokerName/transactions/:transactionName')
  .post(function(req, res){ 
  //  {
  //     brokerId: 1,
  //     transactionId: 11,
  //     processes: [
  //       {
  //         name: 'queryJava',
  //         requestUrl: *** la Url que escriban en el campo ****,
  //         method: 'GET'
  //       }
  //     ],
  //   } 

    var transaction = req.body;
    transaction.brokerName = req.params.brokerName;
    transaction.transactionName = req.params.transactionName;
    transaction.endpointUrl = `127.0.0.1:3000/${req.params.brokerName}/${req.params.transactionName}`

    console.log(transaction);
    Transaction.create(transaction)
      .then((doc) => {
        res.status(200).json(doc.toJSON());
      })
      .catch((err) => {
        res.status(500).json(err);
      });
    });

router.route('/:brokerName/:transactionName')
    .post((req, res, next) => {
      let {transactionName, brokerName} = req.params;

      Transaction.findOne({transactionName, brokerName})
      .then(doc => {
        req.transaction = doc;
        next();
      })
      .catch(err => {
        next(err);
      });
    })
    .post((req, res, next) => {
      let operation1 = req.transaction.operations[0];
       http.request(operation1.method, operation1.requestUrl)
       .then(response => {
         req.operation1 = response;
         next();
       })
       .catch(err => {
         next(err);
       });
    })
    .post((req, res) => {
      console.log('req', req.operation1);
      res.status(200).json(JSON.parse(req.operation1));
    });

module.exports = router; 
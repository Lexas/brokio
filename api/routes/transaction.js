
var express = require('express');
var Transaction = require('../models/transaction');
var http = require('../util/http');

var router = express.Router();

router.route('/brokers/:broker/transactions/:transaction')
  .post(function(req, res){ 
  //  {
  //     brokerName: 'myCompany',
  //     brokerId: 1,
  //     transactionName: 'getUserByTopic',
  //     transactionId: 11,
  //     processes: [
  //       {
  //         name: 'queryJava',
  //         requestUrl: *** la Url que escriban en el campo ****,
  //         method: 'GET'
  //       }
  //     ],
  //     endpointUrl: 'http://brok.io/myCompany/getUsersByTopic'
  //   } 

    var transaction = req.body;
    transaction.brokerName = req.params.broker;
    transaction.transactionName = req.params.transaction;

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
      let process1 = req.transaction.processes[0];
       http.request(process1.method, process1.requestUrl)
       .then(response => {
         req.process1 = response;
         next();
       })
       .catch(err => {
         next(err);
       });
    })
    .post((req, res) => {
      console.log('req', req.process1);
      res.status(200).json(JSON.parse(req.process1));
    });

module.exports = router; 
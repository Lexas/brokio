
var express = require('express');
var Transaction = require('../models/transaction');

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
  //         requestUrl: *** la Url que escriban en el campo ****
  //       }
  //     ],
  //     endpointUrl: 'http://brok.io/myCompany/getUsersByTopic'
  //   } 

    var transaction = req.body;
    transaction.broker = req.params.broker;
    transaction.transactionName = req.params.transaction;

    Transaction.create(transaction)
      .then((doc) => {
        res.status(200).json(doc.toJSON());
      })
      .catch((err) => {
        res.status(500).json(err);
      });
    });

router.route('/my-company/get-users-by-topic')
    .post((req, res) => {
      
    });

module.exports = router; 

var express = require('express');
var Transaction = require('../models/transaction');
var transactionEngine = require('../engine/transaction');

var router = express.Router();
router.route('/test').post((req, res) => res.send('POST'))
.get((req, res) => res.send('GET'))
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

  transaction.output = {
    "total": "operation1.res.total_count",
    "incompletes": "operation1.res.incomplete_results",
  };

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
      return transactionEngine.run(doc);
    })
    .then((out) => {
      res.status(200).json(out);
    })
    .catch(err => {
      next(err);
    });
  });

module.exports = router; 
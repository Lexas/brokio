
var express = require('express');

var router = express.Router();

router.route('/transaction')
  .post(function(req, res){ 
    res.status(200).json({
      user: 'myCompany',
      userId: 1,
      transactionName: 'getUserByTopic',
      transactionId: 11,
      processes: [
        {
          name: 'queryJava',
          requestUrl: 'xxxxxx.github.com/search/?q=java'
        }
      ],
      endpointUrl: 'http://brok.io/myCompany/getUsersByTopic'
    });
  });


module.exports = router; 
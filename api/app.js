var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = require('./routes/transaction');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(router);

app.listen(process.env.PORT, function(){
    console.log('Brok.io is running on '+ process.env.NODE_ENV+' mode on port '+ process.env.PORT);
});

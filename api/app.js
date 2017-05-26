var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = require('./routes/transaction');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
    console.log('afsijfhuyarwbguyjhsba');
    next();
})
app.use(router);

app.listen(3000, function(){
    console.log('There ya go!');
});

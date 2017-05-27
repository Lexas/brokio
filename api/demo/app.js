var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

var router = express.Router();

router.route('/test').post((req, res) => res.send('POST'))
.get((req, res) => res.send('GET'))

router.route('/movieSummary')
  .get((req, res) => {
    var summaries = {
      abc: {
        title: 'super awesome movie',
        rating: 'B',
        photo: 'cool-poster.png',
      },
      def: {
        title: 'bad movie',
        rating: 'A',
        photo: 'ugly-photo.png',
      }
    };
    var movie = summaries[req.query.movieId];
    res.status(200).json(movie);
  });

router.route('/movie-sales')
  .post((req, res) => {
    var salesData = {
      'super awesome movie': {
        title: 'super awesome movie',
        sales: {
          copies_sold: 300,
          unit_price: '$20',
        }
      },
      'bad movie': {
        title: 'bad movie',
        sales: {
          copies_sold: 500,
          unit_price: '$10',
        },
      }
    };

    var sales = salesData[req.body.movieName];

    res.status(200).json(sales);
  });

app.use(router);

app.listen(process.env.PORT || 3333, function(){
    console.log('Brok.io is running on '+ (process.env.PORT || 3333));
});


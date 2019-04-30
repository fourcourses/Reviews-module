<<<<<<< HEAD
const express = require('express');
const bodyParser = require('body-parser');
const Restaurant = require('./database/Restaurant.js');
const path = require('path')

const app = express();
const port = 3004;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', express.static(__dirname + '/public/dist'));
app.use('/restaurants/:id', express.static(__dirname + '/public/dist'));

app.get('/api/restaurants/:id/reviews', (req, res) => {
  Restaurant.aggregate([
    {$match: {id: JSON.parse(req.params.id)}},
    {$unwind: '$reviews'},
    {$sort: {'reviews.createdAt': -1}}
  ], 
  (err, result) => {
    if (err) res.status(400).send('error getting reviews');
    const reviews = [];
    result.map(review => reviews.push(review.reviews))
    res.json(reviews)
  })
});

app.get('/api/restaurants/:id/filters', (req, res) => {
  Restaurant.find({id: JSON.parse(req.params.id)}, (err, result) => {
    if (err) res.status(400).send('error getting filtered keywords');
    res.json(result[0]);
  })
});

app.listen(port, () => console.log(`The port is listening on ${port}`));
=======
//const newrelic = require('newrelic')
const throng = require('throng')
//const bodyParser = require('body-parser');
//const Restaurant = require('./database/Restaurant.js');
//const models = require('./database/cassandra.js')
// const path = require('path')
var WORKER = process.env.WEB__CONCURRENCY || 4;
const port = process.env.port || 3004;
throng({
  workers: WORKER,
  lifetime: Infinity
}, start)


function start() {
  const sequelize = require('./database/postgreSQL/connection.js')
  const express = require('express');
  const redis = require('redis')
  var client = redis.createClient()
  const app = express();
  client.on("error", (err) => {
    console.log("Error" + err)
  })
  app.use('/', express.static(__dirname + '/public/dist'));
  app.use('/restaurants/:id', express.static(__dirname + '/public/dist'));
  var getReviews = (req, res) => {
    //res.send('hello from getReviews')
    var id = req.params.id
    sequelize.query(` select * from reviews INNER JOIN users on (reviews.user_id = users.id) where restaurantid = ${id};`, {
        type: sequelize.QueryTypes.SELECT
      })
      .then(reviews => {
        client.setex(id, 3600, JSON.stringify(reviews))
        res.send(reviews)
      })
  }
  const getCache = (req, res) => {
    let id = req.params.id
    client.get(id, (err, review) => {
      if (review) {
        res.send(JSON.parse(review))
      } else {
        //res.send('responce before getreviews')
        getReviews(req, res)
      }
    })
  }
  app.get('/api/restaurants/:id/reviews', getCache)

  app.listen(port, () => console.log(`The port is listening on ${port}`));
}

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: true}));

// app.get('/api/restaurants/:id/reviews', (req, res) => {
//   Restaurant.aggregate([
//     {$match: {id: JSON.parse(req.params.id)}},
//     {$unwind: '$reviews'},
//     {$sort: {'reviews.createdAt': -1}}
//   ], 
//   (err, result) => {
//     if (err) res.status(400).send('error getting reviews');
//     const reviews = [];
//     result.map(review => reviews.push(review.reviews))
//     res.json(reviews)
//   })
// });

// app.get('/api/restaurants/:id/filters', (req, res) => {
//   Restaurant.find({id: JSON.parse(req.params.id)}, (err, result) => {
//     if (err) res.status(400).send('error getting filtered keywords');
//     res.json(result[0]);
//   })
// });
// app.get('/test',(req,res)=>{
//   models.instance.Person.findOne({id: 911199}, function(err, john){
//     //console.log('test request')
//     if(err) {
//         console.log(err);
//         return;
//     }
//     res.send(JSON.parse(john.reviews));
//   });
// })
>>>>>>> 0df4c234c5474ddd87a21e3d10c0e2696d7a54ed

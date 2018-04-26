require('rootpath')();
var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');
var accepts = require('accepts');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));

app.use('/api', expressJwt({ secret: config.secret }).unless({ path: ['/api/users/authenticate', '/api/users/register'] }));
app.use('/login', require('./controllers/login.controller'));
app.use('/register', require('./controllers/register.controller'));
app.use('/app', require('./controllers/app.controller'));
app.use('/api/users', require('./controllers/api/users.controller'));

app.get('/', function (req, res) {
    return res.redirect('/app');//'/app'
});
app.get('/app', function (req, res) {
    return res.redirect('/boockwetelo');//'/app'
});

var mongojs = require('mongojs');
const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = 'mongodb://Mikele11:face112358@ds149309.mlab.com:49309/boockwetelo';
const MONGO_Content = 'mongodb://Mikele11:face112358@ds259109.mlab.com:59109/contentfibonaci';

MongoClient.connect(MONGO_Content, function(err, db){  
  if (err) {
    return console.log(err);
  }
/*
  app.post('/contentfibonaci', function (req, res) {
	  req.body = {"_id" : "000000000000000000000000", "name":"Последованность Фибоначчи",
  "author":"Последованность Фибоначчи",
  "inputname":"Введите число Фибоначчи",
  "inputname2":"Последнее число присланное сервером",
  "herenumber":"здесь будет число",
  "nameadd":"Прислать",
  "namestop":"Перевести в начальное состояние",
  };
	db.collection("contentfibonaci").insertOne(req.body, function(err, doc) {
		if (err) throw err;
		res.json(doc);
	});
	req.body = {"_id": "000000000000000000000001", "name": "Fibonacci succession",
   "author": "Fibonacci succession",
   "inputname": "Enter the Fibonacci number",
   "inputname2": "The last number sent by the server",
   "herenumber": "there will be a number",
   "nameadd": "Send",
   "namestop": "Transfer to the initial state",
   };
	db.collection("contentfibonaci").insertOne(req.body, function(err, doc) {
		if (err) throw err;
		res.json(doc);
	});
})
*/
	app.get('/contentfibonaci', function (req, res) {
		if (accepts(req).languages()[0] == 'ru-RU'){
				db.collection("contentfibonaci").findOne({_id: "000000000000000000000000"}, function (err, doc) {
					res.json(doc);
				});
			}else{
				db.collection("contentfibonaci").findOne({_id: "000000000000000000000001"}, function (err, doc) {
					res.json(doc);
				});
			}
	})
});

MongoClient.connect(MONGO_URL, function(err, db){  
  if (err) {
    return console.log(err);
  }
	app.post('/boockwetelo', function (req, res) {
		try {
			var count = String(req.query.count[0]);
			if (count == '-'){
				db.collection("boockwetelo").remove({}, function (err, doc) {
					req.body = {"_id" : "000000000000000000000000", "n":"1"};
					db.collection("boockwetelo").insertOne(req.body, function(err, doc) {
						if (err) throw err;
						res.json(doc);
					});	
				});	
			}
		}catch(err){
			db.collection("boockwetelo").find().toArray(function(err, results) {
				if (results[results.length - 1]._id == "000000000000000000000000"){
					if(req.body.n=='1'){
						res.json(Number(results[results.length - 1].n)+Number(req.body.n));
	
						db.collection("boockwetelo").insertOne(req.body, function(err, doc) {
							if (err) throw err;
						});
						req.body = {"_id" : "000000000000000000000001", "n":"2"};
						db.collection("boockwetelo").insertOne(req.body, function(err, doc) {
							if (err) throw err;
						});
					}else{
						res.json('-');
					}
				}else{
					var fib = Number(results[results.length - 1].n)+Number(results[results.length - 2].n);
					if(req.body.n==fib){
						db.collection("boockwetelo").insertOne(req.body, function(err, doc) {
							if (err) throw err;
						});
						var nextfibon = fib + Number(results[results.length - 1].n); 
						req.body = {"_id" : String(nextfibon), "n":String(nextfibon)};
						db.collection("boockwetelo").insertOne(req.body, function(err, doc) {
							if (err) throw err;
							res.json(nextfibon);
						});
					}else{
						res.json('-');
					}
				}
            });
		}
	});
});

// start server
const port = process.env.PORT || 3000;
app.listen(port);
console.log('server run 3000')
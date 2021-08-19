const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;
const fileServerMiddleware = express.static('public');
const mongo_config = require('../config/mongo');

// connecting to MongoDB Atlas
mongoose.connect(mongo_config.CONNECTION_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

// connection failed
mongoose.connection.on('error', function(err) {
    if(err) throw err;
});

// connection successful
mongoose.connection.on("connected", () => {
    console.log("Successfully connected to database");
});

// JSON parser
app.use(bodyParser.json());
// url-encoded parser
app.use(bodyParser.urlencoded({ extended: true }));
// cookie parser
app.use(cookieParser());

const celebrity_router = require('../routes/celebrity');
const movie_router = require('../routes/movie');
const user_router = require('../routes/user');

app.use('/', fileServerMiddleware);
app.use('/celebrity', celebrity_router);
app.use('/movie', movie_router);
app.use('/user', user_router);

app.listen(port, function () {
    console.log('App started on port ' + port);
});

module.exports = app;
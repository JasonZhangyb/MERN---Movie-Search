const mongoose = require('mongoose');
const schema = mongoose.Schema;

// mongoDB schema for movies
const movie = new schema({
    id: String,
    imdb_id: String,
    title: String,
    overview: String,
    poster_path: String,
    release_date: String,
    runtime: String,
    vote_avg: String,
    vote_count: String,
    genres: [{
        id: String,
        name: String
    }],
    provider: String,
    reviews: []
});


const Movie = mongoose.model('Movies', movie);
module.exports = Movie;

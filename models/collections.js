const mongoose = require('mongoose');
const schema = mongoose.Schema;

// mongoDB schema for user collections
const collections = new schema({
    name : {
        type: String,
        required: true
    },
    author_id: String,
    movies: [{
        id: String,
        poster_path: String,
        title: String
    }]
});

const Collections = mongoose.model('Collections', collections);
module.exports = Collections;
const mongoose = require('mongoose');
const schema = mongoose.Schema;

// mongoDB schema for celebrities
const celebrity = new schema({
    id: String,
    name: String,
    profile_path: String,
    known_for: [{
        id: String,
        title: String,
        poster_path: String,
    }]
});

const Celebrity = mongoose.model('Celebrities', celebrity);
module.exports = Celebrity;

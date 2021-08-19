const express = require('express');
const request = require('request');
const sight_engine = require('../config/sight-engine');
const tmdb = require('../config/tmdb');
const router = express.Router();

const celeb_model = require('../models/celebrities');

// POST -- recognize celebrities from image url using Sight Engine API
router.post('/', function(req, res) {

    const image_url = req.body.url;
    const sightengine = require('sightengine')(sight_engine.API_USER, sight_engine.API_KEY);

    // calling the Sight Engine API
    sightengine.check(['celebrities']).set_url(image_url).then(function (result) {

        // valid api response
        if (result.status !== 'failure') {

            // get the sorted celebrity list based on probabilities
            const celebrities = result.faces[0].celebrity.sort(function (a, b) {
                return (parseFloat(a.prob) < parseFloat(b.prob));
            });

            let length = celebrities.length;
            let list = [];

            // retrieve celebrity information
            for (let i = 0; i < length; i++) {
                let data = getCelebData(celebrities[i]);
                list.push(data);
            }

            Promise.all(list)
                .then((data) => {
                    // filter invalid data
                    const result = data.filter(e => e.id !== 'failure');
                    console.log("POST request successfully completed");
                    res.status(200).send(result);
                })
                .catch((err) => {
                    res.status(502).send({id: 'failure', name: '502 Bad Gateway'});
                });
        } else {
            const message = result.error.message;
            res.status(502).send({id: 'failure', name: message});
        }
    }).catch(function (err) {
        res.send(err);
    });

});

// retrieve celebrity information
function getCelebData(celebrity) {
    return new Promise(function(resolve, reject) {
        celeb_model.findOne({name: celebrity.name}, function(db_err, db_result) {
            // no data found in database
            if (!db_result) {
                // calls the TMDB API
                console.log("Calling the API...");
                request('https://api.themoviedb.org/3/search/person?api_key=' + tmdb.API_KEY + '&query='
                    + celebrity.name +'&include_adult=false', function(err_celeb, response_celeb, body_celeb) {
                    if (err_celeb) {
                        reject(err_celeb);
                    }

                    const result_celeb = JSON.parse(body_celeb);

                    if (result_celeb.total_results !== 0) {
                        const celeb = result_celeb.results[0];
                        // retrieve movie information
                        request('https://api.themoviedb.org/3/discover/movie?api_key=' +
                            tmdb.API_KEY + '&with_people=' + celeb.id,
                            function(err_movie, response_movie, body_movie) {
                                if (err_movie) {
                                    reject(err_movie);
                                }

                                const result_movie = JSON.parse(body_movie);
                                const movies = result_movie.results;
                                let movie_list = [];

                                for (let j = 0; j < movies.length; j++) {
                                    movie_list.push({
                                        id: movies[j].id,
                                        title: movies[j].title,
                                        poster_path: movies[j].poster_path
                                    });
                                }

                                const db_celeb = new celeb_model({
                                    id: celeb.id,
                                    name: celebrity.name,
                                    profile_path: celeb.profile_path,
                                    known_for: movie_list
                                });

                                // saving data to the database
                                db_celeb.save(function (err) {
                                    if (err) {
                                        reject(err);
                                    }
                                    console.log("Data successfully saved to database");
                                });

                                resolve({
                                    id: celeb.id,
                                    name: celebrity.name,
                                    prob: celebrity.prob,
                                    profile_path: celeb.profile_path,
                                    known_for: movie_list
                                });
                            });
                    } else {
                        console.log("Cannot find celebrity, moving to the next option...");
                        resolve({id: 'failure', message: "Cannot find celebrity, moving to the next option..."});
                    }
                });
            }
            else {
                // retrieving data from the database
                console.log("Data successfully retrieved from database");
                resolve({
                    id: db_result.id,
                    name: db_result.name,
                    prob: celebrity.prob,
                    profile_path: db_result.profile_path,
                    known_for: db_result.known_for
                });
            }
        });
    });
}

module.exports = router;
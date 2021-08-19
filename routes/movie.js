const express = require('express');
const request = require('request');
const tmdb = require('../config/tmdb');
const router = express.Router();

const movie_model = require('../models/movies');

// POST -- retrieve detailed information of the input movie
router.post('/', function(req, res) {
    const movie_id = req.body.movie_id;

    const movie_data = getMovieData(movie_id);

    movie_data.then((data) => {
        console.log("POST request successfully completed");
        res.status(200).send(data);
    }).catch((err) => {
        res.status(502).send({id: 'failure', title: '502 Bad Gateway'});
    });
});

// retrieve movie information
function getMovieData(movie_id) {
    return new Promise(function(resolve, reject) {
       movie_model.findOne({id: movie_id}, function(db_err, db_result) {
          // no data found in database
          if (!db_result) {
              console.log("Calling the API...");
              request('https://api.themoviedb.org/3/movie/' + movie_id + '?api_key=' + tmdb.API_KEY,
                  function(err_movie, response_movie, body_movie) {
                      if (err_movie) {
                          reject(err_movie);
                      }

                      const result_movie = JSON.parse(body_movie);

                      if (result_movie.success === undefined) {

                          const provider = getProvider(movie_id);
                          const reviews = getReview(movie_id);

                          Promise.all([provider, reviews]).then((data) => {
                              const db_movie = new movie_model({
                                  id: result_movie.id,
                                  imdb_id: result_movie.imdb_id,
                                  title: result_movie.title,
                                  overview: result_movie.overview,
                                  release_date: result_movie.release_date,
                                  runtime: result_movie.runtime,
                                  poster_path: result_movie.poster_path,
                                  vote_avg: result_movie.vote_average,
                                  vote_count: result_movie.vote_count,
                                  genres: result_movie.genres,
                                  provider: data[0],
                                  reviews: data[1]
                              });

                              db_movie.save(function(err) {
                                  if (err) {
                                      reject(err);
                                  }
                                  console.log("Data successfully saved to database");
                              });

                              resolve(db_movie);
                          }).catch((err) => {
                              reject(err);
                          });
                      } else {
                          const message = result_movie.status_message;
                          resolve({id: 'failure', title: message});
                      }
                  });
          } else {
              // retrieving data from the database
              console.log("Data successfully retrieved from database");
              resolve(db_result);
          }
       });
    });
}

// retrieve movie provider
function getProvider(movie_id) {
    return new Promise(function (resolve, reject) {
        request('https://api.themoviedb.org/3/movie/' + movie_id + '/watch/providers?api_key=' + tmdb.API_KEY,
            function (err, response, body) {
                if (err) {
                    reject(err);
                }

                const result = JSON.parse(body);
                const provider = (result.results.US === undefined) ?
                    '' :
                    result.results.US.link;
                resolve(provider);
            });
    });
}

// retrieve movie review
function getReview(movie_id) {
    return new Promise(function (resolve, reject) {
        request('https://api.themoviedb.org/3/movie/' + movie_id + '/reviews?api_key=' + tmdb.API_KEY,
            function (err, response, body) {
                if (err) {
                    reject(err);
                }

                const result = JSON.parse(body);
                if (result.success === undefined) {
                    resolve(result.results);
                } else {
                    resolve([]);
                }
            });
    });
}

module.exports = router;
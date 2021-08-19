const express = require('express');
const passport = require('passport');
const JWT = require('jsonwebtoken');
const passport_config = require('../config/passport');
const router = express.Router();

const user_model = require('../models/users');
const collection_model = require('../models/collections');

// assign a jwt token to user
const signToken = user_id => {
    return JWT.sign({
        iss: "dev_yibin",
        sub: user_id
    }, "CS5610NPE", {expiresIn: "3h"});
};

// POST -- user registration
router.post('/register', (req, res) => {
    const input = req.body;
    user_model.findOne({email: input.email}, (err, user) => {
        if (err) {
            res.status(500).json({message: {msgBody: "Error has occurred", msgError: true}});
        }
        if (user) {
            res.status(400).json({message: {msgBody: "Email already exists", msgError: true}});
        } else {
            user_model.findOne({username: input.username}, (err, user) => {
                if (err) {
                    res.status(500).json({message: {msgBody: "Error has occurred", msgError: true}});
                }
                if (user) {
                    res.status(400).json({message: {msgBody: "Username is already taken", msgError: true}});
                } else {
                    const new_user = new user_model({
                        email: input.email,
                        username: input.username,
                        password: input.password
                    });
                    new_user.save(function (err) {
                        // error on database
                        if (err) {
                            res.status(500).json({message: {msgBody: "Error has occurred", msgError: true}});
                        } else {
                            res.status(201)
                                .json({message: {msgBody: "Account successfully created!", msgError: false}});
                        }
                    });
                }
            });
        }
    });
});

// POST -- user login
router.post('/login', passport.authenticate('local', {session: false}), (req, res) => {
    if (req.isAuthenticated()) {
        const user_info = req.user;
        const token = signToken(user_info._id);
        // provides a jwt access token as cookie
        res.cookie('access_token', token, {httpOnly: true, sameSite: true});
        res.status(200).json({isAuthenticated: true, user: {username: user_info.username}});
    }
});

// GET -- user logout
router.get('/logout', passport.authenticate('jwt', {session: false}), (req, res) => {
    // remove the jwt access token
    res.clearCookie('access_token');
    res.json({user: {username: ""}, success: true});
});

// POST -- create a new movie collection or add a movie to a specific collection depends on the user input
router.post('/collection', passport.authenticate('jwt', {session: false}), (req, res) => {
    const input = req.body;

    // search for the specified collection in database
    collection_model.findOne({name: input.name, author_id: req.user._id}, (err, collection) => {
        // error on database
        if (err) {
            res.status(500).json({message: {msgBody: "Error has occurred", msgError: true}});
        }
        // specified collection found
        if (collection) {
            const input_movie = input.movies[0];
            // the input movie is already in the specified collection
            if (collection.movies.some(movie => movie.id === input_movie.id)) {
                res.status(400).json({
                    message: {msgBody: "This movie is already in the specified collection", msgError: true}});
            }
            // add the input movie into the specified collection and update database
            else {
                collection.movies.push(input_movie);
                collection.save(function(err) {
                    // error on database
                    if (err) {
                        res.status(500).json({message: {msgBody: "Error has occurred", msgError: true}});
                    } else {
                        res.status(201).json(
                            {message: {msgBody: "Movie successfully added to the collection", msgError: false}});
                    }
                });
            }
        }
        // specified collection does not exist in database
        else {
            const new_collection = new collection_model({
                name: input.name,
                author_id: req.user._id,
                movies: input.movies
            });
            new_collection.save(function (err) {
                // error on database
                if (err) {
                    res.status(500).json({message: {msgBody: "Error has occurred", msgError: true}});
                }
                // create a new collection with the input
                else {
                    req.user.collections.push(new_collection);
                    req.user.save(function (err) {
                        if (err) {
                            res.status(500).json({
                                message: {msgBody: "Error has occurred", msgError: true}});
                        } else {
                            res.status(201).json(
                                {message: {msgBody: "Collection successfully created", msgError: false}});
                        }
                    });
                }
            });
        }
    });
});

// GET -- get all collections of current user
router.get('/collections', passport.authenticate('jwt', {session: false}), (req, res) => {
    user_model.findById({_id: req.user._id}).populate('collections').exec((err, document) => {
        // error on database
        if (err) {
            res.status(500).json({message: {msgBody: "Error has occurred", msgError: true}});
        } else {
            res.status(200).json(
                {username: document.username, collections: document.collections, isAuthenticated: true});
        }
    });
});

// DELETE -- delete an entire collection with the input id
router.delete('/collection', passport.authenticate('jwt', {session: false}), (req, res) => {
    user_model.findById(req.user._id, (err, user) => {
        if (err) {
            res.status(500).json({message: {msgBody: "Error has occurred", msgError: true}});
        }
        const index = user.collections.indexOf(req.body._id);
        user.collections.splice(index, 1);
        user.save((err) => {
            if (err) {
                res.status(500).json({message: {msgBody: "Error has occurred", msgError: true}});
            } else {
                collection_model.findByIdAndDelete(req.body._id, (err) => {
                    if (err) {
                        res.status(500).json({message: {msgBody: "Error has occurred", msgError: true}});
                    } else {
                        res.status(200).json(
                            {message: {msgBody: "Collection successfully deleted", msgError: false}});
                    }
                });
            }
        });
    });
});

// DELETE -- delete a movie in a specified collection
router.delete('/movie', passport.authenticate('jwt', {session: false}), (req, res) => {
    const input = req.body;
    collection_model.findById(input._id, (err, collection) => {
        if (err) {
            res.status(500).json({message: {msgBody: "Error has occurred", msgError: true}});
        }
        const index = collection.movies.findIndex(movie => movie.id === input.movie_id);
        collection.movies.splice(index, 1);
        collection.save((err) => {
            if (err) {
                res.status(500).json({message: {msgBody: "Error has occurred", msgError: true}});
            } else {
                res.status(200).json(
                    {message: {msgBody: "Movie successfully deleted from collection", msgError: false}});
            }
        })
    });
});

// GET -- get the authentication information of current user
router.get('/authenticated', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.status(200).json({isAuthenticated: true, user: {username: req.user.username}});
});

module.exports = router;
const expect = require('chai').expect;
const request = require('supertest');
const server = require('../../server/server');
const movie_model = require('../../models/movies');
const user_model = require('../../models/users');
const collection_model = require('../../models/collections');
const generateUser = require('../gen_user');
const imgs = [{
    name: "Kevin Spacey",
    url: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Kevin_Spacey%2C_May_2013.jpg",
},
    // {
    //     name: "Scarllet Johansson",
    //     url: "https://upload.wikimedia.org/wikipedia/commons/6/60/Scarlett_Johansson_by_Gage_Skidmore_2_%28cropped%29.jpg",
    //     },
    // {
    //     name: "Meryl Streep",
    //     url: "https://upload.wikimedia.org/wikipedia/commons/4/46/Meryl_Streep_December_2018.jpg",
    //     },
    // {
    //     name: "Daniel Day-Lewis",
    //     url: "https://upload.wikimedia.org/wikipedia/commons/d/dc/Daniel_Day-Lewis_crop.jpg",
    //     },
    // {
    //     name: "Al Pacino",
    //     url: "https://upload.wikimedia.org/wikipedia/commons/9/98/Al_Pacino.jpg",
    //     }
];


describe('test add collection to user', async () => {
    let users = generateUser();
    beforeEach(async () => {
        let us = await user_model.find();
    });
    describe('test login', () => {
        users.forEach((u) => {
            it(`test login ${u.username}`, async () => {
                let res = await request(server).post('/user/login').send(u).expect(200);
                u.cookie = res.header['set-cookie'];
                expect(res.body.isAuthenticated).to.eq(true)
            })
        })
    });

    describe('test add collections', async () => {
        let movies = await movie_model.find();
        users.forEach(async (u) => {
            describe(`add collection to user ${u.username}`, async () => {
                movies.forEach(async (m, index) => {
                    it(`add movie ${m.title} to user ${u.username}`, async () => {
                        let res =
                            await request(server)
                                .post('/user/collection')
                                .send({
                                    name: index % 3,
                                    movies: [{
                                        id: m.id,
                                        title: m.title,
                                        poster_path: m.poster_path
                                    }]
                                })
                                .set('Cookie', u.cookie);
                        if (res.status === 201) {
                            console.log(res.body);
                            expect(res.body.message.msgError).to.false
                        } else if (res.status === 400) {
                            console.log(res.body);
                            expect(res.body.message.msgError).to.true
                        }
                    })
                })
            })
        })
    });

    describe('test get collctions of a user', async () => {
        users.forEach(async (u) => {
            it(`get collections of user ${u.username}`, async () => {
                let res = await request(server)
                    .get('/user/collections')
                    .set('Cookie', u.cookie)
                    .expect(200);
                expect(res.body.collections).to.exist
            })
        })
    });

    describe('delete movies from a collection', async () => {
        users.forEach(async (u) => {
            describe('get collection from a user', async () => {
                let uu = await user_model.findOne({
                    username: u.username
                });
                let collections = await collection_model.find({
                    author_id: uu._id
                });
                describe('get collections', async () => {
                    collections.forEach(async (c) => {
                        describe('get', async () => {
                            c.movies.forEach(async (m) => {
                                it(`delete movie ${m.title} from collection ${c.name} of user ${u.username}`, async () => {
                                    let res = await request(server)
                                        .delete('/user/movie')
                                        .send({
                                            _id: c._id,
                                            movie_id: m.id
                                        })
                                        .set('Cookie', u.cookie);
                                    if (res.status === 200) {
                                        console.log(res.body);
                                        expect(res.body.message.msgError).to.false
                                    } else if (res.status === 400) {
                                        console.log(res.body);
                                        expect(res.body.message.msgError).to.true
                                    }
                                })
                            })
                        })
                    })
                })
            })
        })
    });

    describe('delete entire collection of a user', () => {
        users.forEach(async (u) => {
            describe('get collections', async () => {
                let uu = await user_model.findOne({
                    username: u.username
                });
                let collections = await collection_model.find({
                    author_id: uu._id
                });
                describe('for each collection', async () => {
                    collections.forEach(async (c) => {
                        it('delete collection', async () => {
                            let res = await request(server)
                                .delete('/user/collection')
                                .send({
                                    _id: c._id
                                })
                                .set('Cookie', u.cookie)
                                .expect(200);
                            console.log(res.body);
                            expect(res.body.message.msgError).to.false
                        })
                    })
                })
            })
        })
    })
});

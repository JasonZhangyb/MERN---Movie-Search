const assert = require('chai').assert;
const expect = require('chai').expect;
const chai = require('chai');
const request = require('supertest');
const server = require('../../server/server');
const mongoose = require('mongoose');
const itParam = require('mocha-param');
const forEach = require('mocha-each');
const celeb_model = require('../../models/celebrities');

const imgs = [
    {
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


describe('add celebrities and movies to database', async () => {
    let condition = false;
    describe('test se', async () => {
        before((done) => {
            setTimeout((done), 5000)
        });

        imgs.forEach(async (img, index) => {
            it(`test se img `, async () => {
                let res = await request(server)
                    .post('/celebrity')
                    .send({url: img.url})
                    .expect(200);
                expect(res.body).to.exist;
                if (index === imgs.length - 1) condition = true
            });
        })
    });


    describe('add movies to database', async () => {
        let cs = await celeb_model.find();
        describe('get celebrity', () => {
            cs.forEach(async (celeb) => {
                describe(`add movies ${celeb.name}`, async () => {
                    celeb.known_for.forEach(async (m) => {
                        it(`add movie ${m.title}`, async () => {
                            let mMsg = await request(server).post('/movie').send({movie_id: m.id}).expect(200);
                            expect(mMsg.body.id).to.exist
                        })
                    })
                })
            })
        })
    })
});




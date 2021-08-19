const expect = require('chai').expect;
const request = require('supertest');
const server = require('../../server/server');
const user_model = require('../../models/users');

const generateUser = require('../gen_user');

describe('test user register', function () {
    let users = generateUser();
    before(function async () {
        let us = user_model.find()
    });

    it('test auth failure', (done) => {
        request(server).get('/user/authenticated').expect(401).end(done)
    });

    describe('test register', () => {
        users.forEach((u) => {
            it(`test register user ${u.username}`, async () => {
                let res = await request(server).post('/user/register').send(u).expect(201)
                expect(res.body.message.msgError).to.eq(false)
            })
        })
    });

    describe('test register failure', () => {
        users.forEach((u) => {
            it(`test register user ${u.username}`, async () => {
                let res = await request(server).post('/user/register').send(u).expect(400)
                expect(res.body.message.msgError).to.eq(true)
            })
        })
    })
});



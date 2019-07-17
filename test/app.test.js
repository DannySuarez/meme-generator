require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Meme = require('../lib/models/Meme');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a meme', () => {
    return request(app)
      .post('/api/v1/memes')
      .send({ top: 'A meme', image: 'url string', bottom: 'generator' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          top: 'A meme',
          image: 'url string',
          bottom: 'generator',
          __v: 0
        });
      });
  });

  it('gets a meme', async() => {
    const meme = await Meme.create({ top: 'A meme', image: 'url string', bottom: 'generator' });
    return request(app)
      .get('/api/v1/memes')
      .then(res => {
        const memeJSON = JSON.parse(JSON.stringify(meme));
        expect(res.body).toEqual([memeJSON]);
      });
  });

  it('gets a meme from id', async() => {
    const meme = await Meme.create({ top: 'meme' });
    return request(app)
      .get(`/api/v1/memes/${meme._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          top: 'meme',
          __v: 0
        });
      });
  });

  it('uses put', async() => {
    const meme = await Meme.create({ top: 'another one', image: 'something' });
    return request(app)
      .put(`/api/v1/memes/${meme._id}`)
      .send({ image: 'url here' })
      .then(res => {
        expect(res.body.image).toEqual('url here');
      });
  });

  it('deletes', async() => {
    const meme = await Meme.create({ top: 'I am a meme', image: 'url', bottom: 'A good meme' });
    return request(app)
      .delete(`/api/v1/memes/${meme._id}`)
      .then(res => {
        expect(res.body.top).toEqual('I am a meme');
      });
  });

});

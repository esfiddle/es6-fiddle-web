const request = require('supertest');
const { app } = require('./../server/app');
const { testUser } = require('./seedData');

describe('GET /profile/:_id returns a user and fiddles', () => {
  const agent = request.agent(app);
  it('should get correct user and fiddles from DB', (done) => {
    agent.get(`/profile/${testUser.user1._id}`)
      .expect(200)
      .end((err) => {
        if (err) return done(err);

        return done();
      });
  });

  it('should return 404 for a false _id param', (done) => {
    agent.get(`/profile/${parseInt(Date.now(), 10).toString(36)}`)
      .expect(404)
      .end((err) => {
        if (err) return done(err);

        return done();
      });
  });
});

const request = require('supertest');
const { app } = require('./../server/app');
const passportMock = require('./passport-mock');
const { testUser } = require('./seedData');

describe('GET /github/myProfile authorized', () => {
  const agent = request.agent(app);
  beforeEach((done) => {
    passportMock(app, {
      passAuthentication: true,
      userId: testUser.user1._id,
    });

    agent.get('/mock/login')
      .end((err) => {
        if (err) {
          return done(err);
        }

        return done();
      });
  });

  it('should allow access to /github/myProfile', (done) => {
    const req = agent.get('/github/myProfile');

    req.expect(200, done);
  });
});

var request = require('supertest'),
    expect = require('chai').expect,
    app = require('./../server/app').app,
    { testUser, testFiddle } = require('./seedData');

describe('GET /profile/:_id returns a user and fiddles', function () {
    var agent = request.agent(app);
    it('should get correct user and fiddles from DB', (done) => {
        agent.get('/profile/' + testUser.user1._id)
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                done()
            });
    });

    it('should return 404 for a false _id param', (done) => {
        agent.get('/profile/' + + parseInt(Date.now(), 10).toString(36))
            .expect(404)
            .end(function(err, res){
                if (err) return done(err);
                done()
            });
    });
});

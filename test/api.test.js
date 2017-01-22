var mongo = require('mongodb').MongoClient,
    request = require('superTest'),
    expect = require('chai').expect,
    app = require('./../app').app;

var testFiddle = {
    fiddle: parseInt( Date.now() , 10).toString(36),
    value: "console.log('Testing....');"
}

mongo.connect(String(process.env.MONGODB_URI), function (err, db) {
    fiddles = db.collection('fiddles');
    fiddles.insert(testFiddle);
});


describe('POST /save', function () {

    it('Should save fiddle in to database', (done) => {
        var fiddleValue = "console.log('Testing....');"

        request(app).post('/save').send({ value: fiddleValue })
            .expect(200)
            .expect((res) => {
                expect(res.body.saved).to.be.true;
                expect(res.body.fiddle).to.be.a('string');
            })
            .end((err, res) => {
                if (err)
                    return done(err);
                // Make sure fiddle is saved in database
                fiddles.findOne({ fiddle:res.body.fiddle }, function (err, item) {
                    if (err) {
                        return done(err);
                    }
                    expect(item).to.not.null;
                    expect(item.fiddle).to.equal(res.body.fiddle);
                    expect(item.value).to.equal(fiddleValue);
                    done();
                });
            });
    });

    it('Should return 400 Bad Request for empty fiddle (no value)', (done) =>{
        request(app).post('/save').send({ })
                                  .expect(400)
                                  .expect( res => {
                                        expect(res.body).to.empty;                                        
                                    })
                                  .end(done);
    });


});


describe('GET /fiddles/fiddle', function () {
    it('should get correct fiddle from DB', (done) => {
        request(app).get('/fiddles/'+testFiddle.fiddle)
                    .expect(200)
                    .expect( res => {
                        expect(res.body).to.not.null;
                        expect(res.body.fiddle).to.equal(testFiddle.fiddle);
                        expect(res.body.value).to.equal(testFiddle.value);
                    })
                    .end(done);
    });

    it('should not return fiddle', (done) => {
        request(app).get('/fiddles/'+ parseInt( Date.now() , 10).toString(36) )
                    .expect(404) 
                    .expect( res => {
                        expect(res.body).to.exist;
                        expect(res.body.fiddle).to.not.exist;
                        expect(res.body.value).to.not.exist;
                        expect(res.body.message).to.exist;
                        
                    })
                    .end(done);
    });
});
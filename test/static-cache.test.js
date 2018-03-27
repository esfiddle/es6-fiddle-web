/* eslint-disable consistent-return */

const request = require("supertest");
const { expect } = require("chai");
const { app } = require("./../server/app");
const fs = require("fs");
const path = require("path");

describe("GET /images/*", () => {
  it("Should return max-age=2628000 for each image", done => {
    fs.readdir(path.resolve(__dirname, "../dist/images/"), (err, files) => {
      files.forEach((file, index, arr) => {
        request(app)
          .get(`/images/${file}`)
          .expect(200)
          .expect(res => {
            expect(res.headers["cache-control"]).to.equal(
              "public, max-age=2628000"
            );
          })
          .end(endErr => {
            if (endErr) {
              return done(endErr);
            }

            if (index === arr.length - 1) {
              return done();
            }
          });
      });
    });
  });
});

/* describe('GET /lib/babel/babel.min.js', () => {
  it('Should return max-age=2628000 for babel.min.js', (done) => {
    request(app)
      .get('/lib/babel/babel.min.js')
      .expect(200)
      .expect((res) => {
        expect(res.headers['cache-control']).to.equal('public, max-age=2628000');
      })
      .end(done);
  });
}); */

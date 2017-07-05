var request = require('supertest');
var mocha = require('mocha');
var express = require('express');
var assert = require('assert');
var staticRoutes = require('./../server/routes/static');

describe('Routes', function() {
	describe('GET / and return 200', function() {
	  it('responds with 200', function(done) {
		request(staticRoutes)
	      .get('/')
	      .expect(200);
	      done()
	  });
	});

	describe('GET /wrongURL and return 404', function() {
	  it('responds with 404', function(done) {
		request(staticRoutes)
	      .get('/wrongURL')
	      .expect(404);
	    done()
	  	});
	});

	describe('GET /about return 200', function() {
	  it('responds with 200', function(done) {
		request(staticRoutes)
	      .get('/about')
	      .expect(200);
	      done()
	  	});
	});
	
	describe('GET /faq and return 200', function() {
	  it('responds with 200', function(done) {
		request(staticRoutes)
	      .get('/faq')
	      .expect(200);
	    done();
	  	});
	});
});
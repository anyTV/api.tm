'use strict';

var should  = require('chai').should(),
    request = require('supertest'),
    config,
    api;

config = require(__dirname + '/../config/config');
require(__dirname + '/../server');
api = request('http://localhost:' + config.PORT);



describe('User', function () {
	it('should get one user', function (done) {
        api.get('/user/cf9fcb1f-8fea-499a-b58f-c69576a11cd5')
            .expect(200)
            .end(function (err) {
                should.not.exist(err);
                done();
            });
    });
});

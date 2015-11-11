const should = require('chai').should();
const app    = require(process.cwd() + '/server');

describe('App', () => {
    it('environment should default to test environment', (done) => {
		app.app.get('env').should.equal('test');
		done();
	});
});

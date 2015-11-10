'use strict';

/**
    Last maintained : 2015-11-06 (rvnjl)
**/

const config      = require(__dirname + '/config/config');
const util        = require(__dirname + '/helpers/util');
const mysql       = require('anytv-node-mysql');
const body_parser = require('body-parser');
const winston     = require('winston');
const express     = require('express');
const app         = express();


winston.cli();
winston.level = config.LOG_LEVEL || 'silly';

winston.log('info', 'Starting', config.APP_NAME, 'on', config.ENV, 'environment');

mysql.add('my_db', config.DB);

app.set('view engine', '.html');
app.set('case sensitive routing', true);
app.set('x-powered-by', false);

winston.log('verbose', 'Binding 3rd-party middlewares');
app.use(require('morgan')('combined', {stream: util.get_log_stream(config.LOGS_DIR)}));
app.use(express.static(config.ASSETS_DIR));
app.use(require('method-override')());
app.use(body_parser.urlencoded({extended: false}));
app.use(body_parser.json());
app.use(require('compression')());


winston.log('verbose', 'Binding custom middlewares');
app.use(require('anytv-node-cors')(config.CORS));
app.use(require(__dirname + '/lib/res_extended')());
app.use(require(__dirname + '/config/router')(express.Router()));
app.use(require('anytv-node-error-handler')(winston));

app.listen(config.PORT);
winston.log('info', 'Server listening on port', config.PORT);


module.exports = app;

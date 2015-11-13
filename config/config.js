'use strict';

const _    = require('lodash');
const path = require('path');
const config = {
    APP_NAME: 'anyTV Node Boilerplate',

    PORT: 6969,

    CORS:  {
        allowed_headers: 'Access-Token, X-Requested-With, Content-Type, Accept',
        allowed_origins: '*',
        allowed_methods: 'GET, POST, PUT, OPTIONS, DELETE'
    },

    UPLOAD_DIR: path.normalize(__dirname + '/../uploads/'),
    ASSETS_DIR: path.normalize(__dirname + '/../assets'),
    VIEWS_DIR: path.normalize(__dirname + '/../views'),
    LOGS_DIR: path.normalize(__dirname + '/../logs/'),


    DB: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'test'
    }
};

// set development as our default environment
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development';
}

module.exports = _.assign(config, require(__dirname + '/env/' + process.env.NODE_ENV));

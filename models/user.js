'use strict';

const mysql   = require('anytv-node-mysql');
const winston = require('winston');



exports.get_user = (user_id, callback) => {
    function start () {
        mysql.use('dashboard_db')
            .query(
                'SELECT given_name AS first_name, family_name AS last_name, ' +
                'email, birthdate, country FROM users WHERE id = ? LIMIT 1;',
                [user_id],
                callback
            )
            .end();
    }

    start();
};

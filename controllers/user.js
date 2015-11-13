'use strict';

const mysql   = require('anytv-node-mysql');
const winston = require('winston');


exports.get_user = (req, res, next) => {

    function start () {
        mysql.use('my_db')
            .query(
                'SELECT * FROM users WHERE user_id = ? LIMIT 1;',
                [req.params.id],
                send_response
            )
            .end();
    }

    function send_response (err, result, args, last_query) {
        if (err) {
            winston.error('Error in selecting users', last_query);
            return next(err);
        }

        if (!result.length) {
            return res.warn(404, {message: 'User not found'});
        }

        res.send(result[0]);
    }

    start();
};

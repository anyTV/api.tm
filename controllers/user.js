'use strict';

const mysql   = require('anytv-node-mysql');
const winston = require('winston');
const util = require(__dirname + '/../helpers/util');

/**
 * @api {get} /user/:id Get user information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {String} id User's unique ID
 *
 * @apiSuccess {String} user_id User's unique ID
 * @apiSuccess {String} date_created Time when the user was created
 * @apiSuccess {String} date_updated Time when last update occurred
 */
exports.get_user = (req, res, next) => {
    function start () {
        mysql.use('dashboard_db')
            .query(
                'SELECT given_name AS first_name, family_name AS last_name, ' +
                'email, birthdate, country FROM users WHERE id = ? LIMIT 1;',
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

        res.send(util.format_success(result[0]));
    }

    start();
};

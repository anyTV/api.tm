'use strict';

const winston = require('winston');
const util    = require(__dirname + '/../helpers/util');
const User    = require(__dirname + '/../models/user');
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
        res.anytv_quota.set_weight(1);
        User.get(req.params.id, send_response);
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

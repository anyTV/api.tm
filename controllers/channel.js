'use strict';

const mysql   = require('anytv-node-mysql');
const winston = require('winston');
const util = require(__dirname + '/../helpers/util');


exports.get_channels = (req, res, next) => {
    let connection = mysql.use('dashboard_db');
    let data = util.get_data({
        'user_id': '',
        '_page': 0,
        '_limit': 0
    }, req.query);
    let page = data.page || 1;
    let limit = data.limit || 10;
    let offset = (page - 1) * limit;
    let result;

    function start () {
        //move this to model
        connection.query(
            'SELECT SQL_CALC_FOUND_ROWS channel_id, channel_name, ' +
            'channel_username, linked, ' +
            'temp, viewCount, subscriberCount, created_at FROM ' +
            'channels WHERE user_id = ? LIMIT ? OFFSET ?',
            [data.user_id, limit, offset],
            get_total_count
        );
    }

    function get_total_count (err, data) {
        if (err) {
            winston.error(err.message);
            return next(err);
        }

        result = data;

        if (!result.length) {
            connection.end();

            return send_response(null, [{total_count: 0}]);
        }

        connection.query('SELECT FOUND_ROWS() as total_count',
            send_response)
        .end();
    }

    function send_response (err, data) {
        if (err) {
            winston.error(err.message);
            return next(err);
        }

        return res.send(util.format_success(result, {
            total_count: data[0].total_count,
            limit: limit
        }));
    }

    start();
};

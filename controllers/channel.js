'use strict';

const mysql   = require('anytv-node-mysql');
const winston = require('winston');
const util = require(__dirname + '/../helpers/util');



exports.get_channels = (req, res, next) => {
    const data = util.get_data({
        user_id: '',
        _page: 1,
        _limit: 1
    }, req.query);
    let channels;

    function start () {
        let offset;

        data.page = data.page || 1;
        data.limit = data.limit || 10;
        offset = (page - 1) * limit;

        mysql.use('dashboard_db')
            .query(
                'SELECT SQL_CALC_FOUND_ROWS channel_id, channel_name, ' +
                'channel_username, linked, ' +
                'temp, viewCount, subscriberCount, created_at FROM ' +
                'channels WHERE user_id = ? LIMIT ? OFFSET ?',
                [data.user_id, data.limit, offset],
                get_total_count
            );
    }

    function get_total_count (err, result) {
        if (err) {
            winston.error(arguments[3]);
            return next(err);
        }

        if (!result.length) {
            mysql.end();
            return send_response(null, [{total_count: 0}]);
        }

        channels = result;
        mysql.query(
            'SELECT FOUND_ROWS() AS total_count',
            send_response
        )
        .end();
    }

    function send_response (err, result) {
        if (err) {
            winston.error(err.message);
            return next(err);
        }

        return res.send(util.format_success(channels, {
            total_count: result[0].total_count,
            limit: data.limit
        }));
    }

    start();
};



exports.partner_status = (req, res, next) => {
    function start () {
        mysql.use('dashboard_db')
            .query(
                'SELECT linked FROM channels WHERE channel_id = ? LIMIT 1',
                [req.params.id],
                send_response
            )
            .end();
    }

    function send_response (err, result) {
        if (err) {
            winston.error(err.message);
            return next(err);
        }

        if (!result.length) {
            return res.warn(404, 'Channel not found');
        }

        return res.send(util.format_success({is_freedom_partner: result[0].linked}));
    }

    start();
};

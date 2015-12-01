'use strict';

const mysql   = require('anytv-node-mysql');
const winston = require('winston');



exports.get_by_user = (data, callback) => {
    let channels = {};

    function start () {
        mysql.use('dashboard_db')
            .query(
                `SELECT SQL_CALC_FOUND_ROWS channel_id, channel_name,
                channel_username, linked, temp AS channel_status,
                viewCount AS view_count, subscriberCount 
                AS subscriber_count, created_at FROM
                channels WHERE user_id = ? LIMIT ? OFFSET ?`,
                [data.user_id, data.limit, data.offset],
                get_total_count
            );
    }

    function get_total_count (err, result, args, last_query) {
        if (err) {
            winston.error('Error in selecting channels', last_query);
            return callback(err);
        }

        if (!result.length) {
            mysql.end();
            return done(null, [{total_count: 0}]);
        }

        channels.items = result;
        mysql.query(
            'SELECT FOUND_ROWS() AS total_count',
            done
        )
        .end();
    }

    function done (err, result) {
        if (err) {
            winston.error(err.message);
            return callback(err);
        }

        channels.total_count = result[0].total_count;
        callback(null, channels);
    }

    start();
};



exports.get_partner_status = (channel_id, callback) => {
    function start () {
        mysql.use('dashboard_db')
            .query(
                'SELECT linked FROM channels WHERE channel_id = ? LIMIT 1',
                [channel_id],
                callback
            )
            .end();
    }

    start();
};

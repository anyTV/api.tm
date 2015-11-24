'use strict';

const mysql   = require('anytv-node-mysql');
const winston = require('winston');
const util = require(__dirname + '/../helpers/util');


exports.partner_status = (req, res, next) => {
    function start () {
        if (!req.params.id) {
            return next('id is missing');
        }

        mysql.use('dashboard_db')
            .query(
                'SELECT linked FROM channels WHERE channel_id = ? LIMIT 1',
                [req.params.id],
                send_response
            )
            .end();
    }

    function send_response (err, data) {
        if (err) {
            winston.error(err.message);
            return next(err);
        }

        if (!data.length) {
            return res.warn(404, 'Channel not found');
        }

        return res.send(util.format_success({is_freedom_partner: data[0].linked}));
    }

    start();
};

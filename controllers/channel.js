'use strict';

const winston = require('winston');
const util    = require(__dirname + '/../helpers/util');
const Channel = require(__dirname + '/../models/channel');



exports.get_channels_by_user = (req, res, next) => {
    const data = util.get_data({
        user_id: '',
        _page: 1,
        _limit: 1
    }, req.query);

    function start () {
        res.anytv_quota.set_weight(1);

        data.page = data.page || 1;
        data.limit = data.limit || 10;
        data.offset = (data.page - 1) * data.limit;

        Channel.get_by_user(data, send_response);
    }

    function send_response (err, result) {
        if (err) {
            winston.error(err.message);
            return next(err);
        }

        if (!result.total_count) {
            return result.warn(404, 'No channels found');
        }

        return res.send(util.format_success(result.items, {
            total_count: result.total_count,
            limit: data.limit
        }));
    }

    start();
};



exports.partner_status = (req, res, next) => {
    function start () {
        res.anytv_quota.set_weight(1);

        Channel.get_partner_status(req.params.id, send_response);
    }

    function send_response (err, result, args, last_query) {
        if (err) {
            winston.error('Error in getting partnership status', last_query);
            return next(err);
        }

        if (!result.length) {
            return res.warn(404, 'Channel not found');
        }

        return res.send(util.format_success({is_freedom_partner: result[0].linked}));
    }

    start();
};

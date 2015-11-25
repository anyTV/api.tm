'use strict';

const config   = require(__dirname + '/config');
const importer = require('anytv-node-importer');
const upload   = require('multer')({dest: config.UPLOAD_DIR});
const mysql    = require('anytv-node-mysql');
const quota    = require('anytv-node-quota');

module.exports = (router) => {
    const __ = importer.dirloadSync(__dirname + '/../controllers');
    const quota_store = quota.store.create(mysql);
    const quota_middleware = quota.middleware(quota_store, 'default', false);

    router.del = router.delete;

    router.get('/channel/:id/partner_status', quota_middleware, __.channel.partner_status);
    router.get('/channel/user',               quota_middleware, __.channel.get_channels_by_user);
    router.get('/user/:id',                   quota_middleware, __.user.get_user);

    router.all('*', function (req, res) {
        res.status(404)
            .send({message: 'Nothing to do here.'});
    });

    return router;
};

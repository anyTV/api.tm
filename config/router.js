'use strict';

const config   = require(__dirname + '/config');
const importer = require('anytv-node-importer');
const upload   = require('multer')({dest: config.UPLOAD_DIR});

module.exports = (router) => {
    const __ = importer.dirloadSync(__dirname + '/../controllers');

    router.del = router.delete;

    router.get('/channel/:id/partner_status', __.channel.partner_status);
    router.get('/channel/user',               __.channel.get_channels_by_user);
    router.get('/user/:id',                   __.user.get_user);

    router.all('*', function (req, res) {
        res.status(404)
            .send({message: 'Nothing to do here.'});
    });

    return router;
};

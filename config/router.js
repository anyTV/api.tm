'use strict';

var config   = require(__dirname + '/config'),
	importer = require('anytv-node-importer'),
	upload   = require('multer')({dest: config.UPLOAD_DIR});

module.exports = function (router) {
    var c = importer.dirloadSync(__dirname + '/../controllers');

    router.del = router.delete;

    router.get('/user/:id', c.user.get_user);

    router.all('*', function (req, res) {
        res.status(404)
            .send({message: 'Nothing to do here.'});
    });

    return router;
};

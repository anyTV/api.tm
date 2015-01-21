/**
    Last maintained : 2014-12-15 (rvnjl)
**/

var config   = require(__dirname + '/config'),
    logger   = require('anytv-node-logger'),
    importer = require('anytv-node-importer');

module.exports  = function (router) {
    var c = importer.dirloadSync(__dirname + '/../controllers');

    router.del  = router.delete;


    router.all ('*', function (req, res) {
        res.status(404)
            .send({message : 'Nothing to do here.'});
    });

    return router;
};

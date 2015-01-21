/**
    Utilities
*/

exports.hash = function (string, hash) {
    return require('crypto').createHash(hash || 'sha1').update('' + string).digest('hex');
};


exports.get_data = function (reqd, optional, body) {
    var i = reqd.length,
        ret = {},
        temp;

    while (i--) {
        if (!body[temp = reqd[i]] || typeof body[temp] === 'object') {
            return temp + ' is missing';
        }
        ret[temp] = body[temp];
    }

    i = optional.length;

    while (i--) {
        if (body[temp = optional[i]]) {
            ret[temp] = body[temp];
        }
    }
    return ret;
};


exports.random_string = function (i) {
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        str = '',
        l = i || 32;

    while (l--)
        str += possible.charAt(~~(Math.random() * 62));

    return str;
};


exports.generate_UUID = function () {
    var d = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
        function(c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x'
                    ? r
                    : (r & 0x3 | 0x8)
                )
                .toString(16);
        }
    );
};


exports.unique_short_string = function (n) {
    return (+new Date * Math.random())
        .toString(36)
        .replace('.', '')
        .substring(0, n);
};


exports.pad = function (num, size) {
    return ('000000000' + num).substr(-(size || 2));
};

exports.to_title_case = function (str) {
    if (str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
    return false;
};


exports.caps_first = function (string) {
    return string.charAt(0)
            .toUpperCase()
        + string.slice(1);
};


exports.clean_string = function (string) {
    return string
        .match(/\S{1,30}/g)
        .join(' ');
};


exports.split = function (a, n) {
    var len = a.length,
        out = [],
        i = 0;

    while (i < len) {
        out.push(a.slice(i, i += Math.ceil((len - i) / n--)));
    }

    return out;
};


exports.slice = function (a, n) {
    var len = a.length,
        out = [],
        number_of_slice = Math.ceil(len / n);
        i = 0;

    while (number_of_slice--) {
        out.push(a.splice(i, n));
        i += n;
    }

    return out;
};


exports.extend = function (obj, source) {
    var prop;

    for (prop in source) {
        if (source.hasOwnProperty(prop)) {
           obj[prop] = source[prop];
        }
    }

    return obj;
};

exports.get_log_stream = function (dir) {
    var moment = require('moment'),
        fs = require('fs');

    return fs.createWriteStream(dir + '/access-' + moment().format('YYYY-MM-DD') + '.log', {flags: 'a'});
};

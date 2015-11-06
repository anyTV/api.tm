'use strict';
/**
    Utilities
*/

exports.hash = (string, hash) =>
    require('crypto')
        .createHash(hash || 'sha1')
        .update('' + string)
        .digest('hex');


exports.get_data = (reqd, optional, body) => {
    const types = ['string', 'number'];

    let i = reqd.length;
    let ret = {};
    let temp;

    if (typeof(optional) === 'object' && !Array.isArray(optional)) {
        body = optional;
        optional = [];
    }

    while (i--) {
        temp = reqd[i];
        if (!~types.indexOf(typeof(body[temp])) || body[temp] === '') {
            return temp + ' is missing';
        }
        ret[temp] = body[temp];
    }

    i = optional.length;

    while (i--) {
        if (body[temp = optional[i]] && ~types.indexOf(typeof(body[temp]))) {
            ret[temp] = body[temp];
        }
    }

    return ret;
};


exports.random_string = (i) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let l = i || 32;
    let str = '';

    while (l--) {
        str += possible.charAt(~~(Math.random() * 62));
    }

    return str;
};

/**
 * Fast UUID generator, RFC4122 version 4 compliant.
 * @author Jeff Ward (jcward.com).
 * @license MIT license
 * @link http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
 **/

exports.generate_UUID = () => {
    const UUID = (() => {
        const self = {};
        const lut = [];
        const i = 0;

        for (; i < 256; i += 1) {
            lut[i] = (i < 16 ? '0' : '') + (i).toString(16);
        }

        self.generate = () => {
            const d0 = Math.random() * 0xffffffff | 0;
            const d1 = Math.random() * 0xffffffff | 0;
            const d2 = Math.random() * 0xffffffff | 0;
            const d3 = Math.random() * 0xffffffff | 0;

            return lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] +
                '-' +
                lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 &
                    0xff] + '-' +
                lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 &
                    0xff] +
                lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff];
        };

        return self;
    })();

    return UUID.generate();
};


exports.unique_short_string = (n) =>
    (+new Date() * Math.random())
        .toString(36)
        .replace('.', '')
        .substring(0, n);


exports.pad = (num, size) =>
    ('000000000' + num).substr(-(size || 2));


exports.to_title_case = (str) =>
    str
        ? str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
        : '';


exports.caps_first = (string) =>
    string.charAt(0)
        .toUpperCase()
    + string.slice(1);


exports.clean_string = (string) =>
    string.match(/\S{1,30}/g)
        .join(' ');


exports.split = (a, n) => {
    const len = a.length;
    const out = [];

    let i = 0;

    while (i < len) {
        out.push(a.slice(i, i += Math.ceil((len - i) / n--)));
    }

    return out;
};


exports.slice = (a, n) => {
    const out = [];

    let number_of_slice = Math.ceil(a.length / n);

    for (let i = 0; number_of_slice--; i += n) {
        out.push(a.splice(0, n));
    }

    return out;
};


exports.extend = (obj, source) => {
    let prop;

    for (prop in source) {
        if (source.hasOwnProperty(prop)) {
           obj[prop] = source[prop];
        }
    }

    return obj;
};


exports.get_log_stream = (dir) => {
    const file_stream_rotator = require('file-stream-rotator');
    const moment = require('moment');
    const proc_id = process.env.cpu_number || '';

    return file_stream_rotator.getStream({
        filename: dir + '/access-%DATE%.' + proc_id + '.log',
        frequency: 'daily',
        verbose: false
    });
};


exports.clone = (obj) =>
    JSON.parse(JSON.stringify(obj));

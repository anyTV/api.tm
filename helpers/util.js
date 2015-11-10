'use strict';
/**
    Utilities
*/

function hash (string, hash) {
    return require('crypto')
        .createHash(hash || 'sha1')
        .update('' + string)
        .digest('hex');
}

/**
 * Data validator
 * @param1 pass a sample object
    put _ as first character of the key to indicate as optional
    @example:
        get_data({
            name: '',  // any string
            age: 1, //
            admin: true,
            _skype: ''
        });
 * @param2 source (req.body, req.query, req.params)
 **/
function get_data (sample, source) {
    let final = {};

    function validate_primitive_value (sample, prop, source, source_prop) {
        const source_type = typeof source[source_prop];
        const type = typeof sample[prop];

        if (source_type === 'undefined' && prop[0] !== '_') {
            throw new Error(`${prop} is missing`);
        }

        if (source_type !== 'undefined' && source_type !== type) {
            throw new Error(`${prop} invalid type`);
        }

        if (type === 'object') {
            return get_data(sample[prop], source[source_prop]);
        }

        return source[source_prop];
    }

    if (typeof sample !== typeof source) {
        throw new Error('Sample-Source type mismatch');
    }

    if (Array.isArray(sample)) {
        return source.map((a, index) => {
            return validate_primitive_value(sample, 0, source, index);
        });
    }

    for (let prop in sample) {
        if (sample.hasOwnProperty(prop)) {
            let source_prop = prop;
            let data;

            if (prop[0] === '_') {
                source_prop = prop.slice(1);
            }

            data = validate_primitive_value(sample, prop, source, source_prop);

            if (typeof data !== 'undefined') {
                final[source_prop] = data;
            }
        }
    }

    return final;
}



function random_string (i) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let l = i || 32;
    let str = '';

    while (l--) {
        str += possible.charAt(~~(Math.random() * 62));
    }

    return str;
}

/**
 * Fast UUID generator, RFC4122 version 4 compliant.
 * @author Jeff Ward (jcward.com).
 * @license MIT license
 * @link http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
 **/
function generate_UUID () {
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
}


function unique_short_string (n) {
    return (+new Date() * Math.random())
        .toString(36)
        .replace('.', '')
        .substring(0, n);
}


function pad (num, size) {
    return ('000000000' + num).substr(-(size || 2));
}


function to_title_case (str) {
    return str
        ? str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
        : '';
}


function caps_first (string) {
    return string.charAt(0)
        .toUpperCase()
    + string.slice(1);
}


function clean_string (string) {
    return string.match(/\S{1,30}/g)
        .join(' ');
}


function split (a, n) {
    const len = a.length;
    const out = [];

    let i = 0;

    while (i < len) {
        out.push(a.slice(i, i += Math.ceil((len - i) / n--)));
    }

    return out;
}


function get_log_stream (dir) {
    const file_stream_rotator = require('file-stream-rotator');
    const moment = require('moment');
    const proc_id = process.env.cpu_number || '';

    return file_stream_rotator.getStream({
        filename: dir + '/access-%DATE%.' + proc_id + '.log',
        frequency: 'daily',
        verbose: false
    });
}


function clone (obj) {
    return JSON.parse(JSON.stringify(obj));
}



module.exports = {
    hash,
    get_data,
    random_string,
    generate_UUID,
    unique_short_string,
    pad,
    to_title_case,
    caps_first,
    clean_string,
    split,
    get_log_stream,
    clone
};

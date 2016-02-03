'use strict';

const mysql = require('anytv-node-mysql');



exports.get_unmonetized = (params, callback) => {
    const offset = (params.page - 1) * params.limit;

    mysql.use('dashboard_db')
      .query(
          `SELECT * FROM unmonetized_videos
          WHERE channel_id = ? ORDER BY views desc
          LIMIT ? OFFSET ?`,
          [params.channel_id, params.limit, offset],
          callback
      ).end();
};


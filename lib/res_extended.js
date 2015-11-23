'use strict';

module.exports = () => {
	return (req, res, next) => {
		res.warn = (status, error) => {
	        if (typeof error === 'undefined' ) {
	            error = status;
	            status = 400;
	        }

	        res.status(status)
	            .send(error);
	    };

	    next();
	};
};

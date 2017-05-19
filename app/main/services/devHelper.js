'use strict';

angular.module('dev', [
	'configuration'
])

.factory('devHelper', ['$log', 'config',
	function ($log, config) {

		/*
		 * Usage:
		 * include dev module, inject devHelper, then:
		 * 
		 * Default log:
		 * devHelper.log(1,2,3,4,5,......, 10); 
		 *
		 * Using log level
		 * devHelper.log(1,2,3,4,5,.....,10, 'error');
		 *
		 * Supported log levels:
		 * 'log', 'info', 'warn', 'error', 'debug'
		 */
		var log = function() {
			if(config.env.toLowerCase() === 'prod') {
				return;
			}

			// get loglevel
			var logLevel = arguments[arguments.length - 1];

			// supported log levels
			var supportedLogLevel = ['log', 'info', 'warn', 'error', 'debug'];

			// convert argument to array
			var argArr = Array.prototype.slice.call(arguments);

			if(supportedLogLevel.indexOf(logLevel) < 0) {
				// if no log level present, set level to log
				logLevel = 'log';
			} else {
				// if log level present, remove it from the argument array
				argArr.pop();
			}

			// convert to arg for later call
			argArr.join(',');

			// call $log
			eval('$log.' + logLevel + '(argArr)');
		};

		return {
			log: log
		};
	}
]);
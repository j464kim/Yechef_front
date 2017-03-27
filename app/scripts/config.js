'use strict';

angular.module('configuration', [])

.constant('config', (function() {
	var endpoint,
		env,
		debugMode;

	env = 'DEBUG';

	// remember to add the last /
	var debugAPI 	= 	'//laravel.dev/api/';
	var productAPI 	= 	'//laravel.dev/api/';


	/* jshint undef: false */
	switch(env) {
		case 'DEBUG':
			endpoint = debugAPI;
			debugMode = true;
			break;
		case 'PROD':
			endpoint = productAPI;
			debugMode = false;
			break;
		default:
			endpoint = debugAPI;
			debugMode = false;
			break;
	}

	return {
		env : 			env,
		debugMode: 		debugMode,
		endpoint : 		endpoint,
	};

})());
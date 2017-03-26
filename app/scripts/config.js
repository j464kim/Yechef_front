'use strict';

angular.module('config', [])

.constant('constant', (function() {
	var endpoint,
		env,
		debugMode;

	env = 'DEBUG';

	// remember to add the last /
	var debugAPI 	= 	'//localhost:8000/api/';
	var productAPI 	= 	'//localhost:8000/api/';


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
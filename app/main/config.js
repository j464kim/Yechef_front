'use strict';

angular.module('configuration', [])

	.constant('config', (function () {
		var endpoint,
			env,
			debugMode;

		env = 'DEBUG';

		// remember to add the last /
		var debugAPI = '//laravel.dev/api/';
		var productAPI = '//laravel.dev/api/';

		// image upload
		var maxFiles = 3;
		var maxFileSize = 4; // 4mb
		var acceptedFiles = 'image/jpeg, images/jpg, image/png';
		var parallelUploads = 10;
		var uploadMultiple = true;
		var autoProcessQueue = false;
		var addRemoveLinks = true;


		/* jshint undef: false */
		switch (env) {
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
			env: env,
			debugMode: debugMode,
			endpoint: endpoint,
			maxFiles: maxFiles,
			maxFileSize: maxFileSize,
			acceptedFiles: acceptedFiles,
			parallelUploads: parallelUploads,
			uploadMultiple: uploadMultiple,
			autoProcessQueue: autoProcessQueue,
			addRemoveLinks: addRemoveLinks,
		};

	})());
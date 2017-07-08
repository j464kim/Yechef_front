'use strict';

angular.module('configuration', [])

	.constant('config', (function () {
		var endpoint,
			env,
			debugMode;

		var envProd = 'PROD';
		var envDebug = 'DEBUG';

		env = envDebug;

		// remember to add the last /
		var debugAPI = '//laravel.dev/api/';
		var productAPI = '//serene-hamlet-46448.herokuapp.com/api/';

		// social configurations
		var facebookAppId = '789389204557240';
		var googleAppId = '716914948245-t5k325iea7jmqhk8kolu59cdt6v4ssrr.apps.googleusercontent.com';

		// TODO: configure locale to know which type of currency
		var currency = 'cad';

		// image upload
		var maxFiles = 3;
		var maxFileSize = 4; // 4mb
		var acceptedFiles = 'image/jpeg, images/jpg, image/png';
		var parallelUploads = 10;
		var uploadMultiple = true;
		var autoProcessQueue = false;
		var addRemoveLinks = true;

		// Nationality
		var nationalities = 'Fusion, African, American, Argentine, Bangladeshi, Brazilian, Burmese, Canadian, Chilean, \
                    Chinese, Ecuadorian, English, Ethiopian, French, German, Greek, Hungarian, Indian, Indonesian, \
                    Irish, Israeli, Italian, Jamaican, Japanese, Korean, Malaysian, Maltese, Mexican, Moroccan, \
                    Nepalese, Oceanic, Pakistani, Palestinian, Peruvian, Philippine, Polish, Portuguese, Russian, \
                    Sami, Scottish, Sicilian, Singaporean, Spanish, Thai, Tibetan, Uzbek, Vietnamese';

		// cookie expiration in days
		var cookieExpirationInDays = 3;

		/* jshint undef: false */
		switch (env) {
			case envDebug:
				endpoint = debugAPI;
				debugMode = true;
				break;
			case envProd:
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
			envProd: envProd,
			envDebug: envDebug,
			debugMode: debugMode,
			endpoint: endpoint,
			facebookAppId: facebookAppId,
			googleAppId: googleAppId,
			cookieExpirationInDays: cookieExpirationInDays,
			maxFiles: maxFiles,
			maxFileSize: maxFileSize,
			acceptedFiles: acceptedFiles,
			parallelUploads: parallelUploads,
			uploadMultiple: uploadMultiple,
			autoProcessQueue: autoProcessQueue,
			addRemoveLinks: addRemoveLinks,
			nationalities: nationalities,
			currency: currency
		};

	})());
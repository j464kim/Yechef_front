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
		var facebookAppId = '1830093113873770';
		var googleAppId = '713347919649-pndccmhn95t2pp68gk36368k6ccvgsp0.apps.googleusercontent.com';

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

		//carousel
		var carouselDefaultInterval = 5000; //ms

		// Payment Service
		var stripePublishableKey = 'pk_test_RZjSNtHLydLfeylIF2BkP6s5';

		// Nationality
		var nationalities = 'Fusion, African, American, Argentine, Bangladeshi, Brazilian, Burmese, Canadian, Chilean, \
                    Chinese, Ecuadorian, English, Ethiopian, French, German, Greek, Hungarian, Indian, Indonesian, \
                    Irish, Israeli, Italian, Jamaican, Japanese, Korean, Malaysian, Maltese, Mexican, Moroccan, \
                    Nepalese, Oceanic, Pakistani, Palestinian, Peruvian, Philippine, Polish, Portuguese, Russian, \
                    Sami, Scottish, Sicilian, Singaporean, Spanish, Thai, Tibetan, Uzbek, Vietnamese';

		// Countries available for payout
		var payoutCountries = 'US, CA';

		// State / Province
		var states = {
			'US': 'AK, AL, AR, AS, AZ, CA, CO, CT, DC, DE, FL, GA, GU, HI, IA, ID, IL, IN, KS, KY, LA, MA, MD, ME, MI, MN,'  +
			'MO, MS, MT, NC, ND, NH, NJ, NM, NV, NY, OH, OK, OR, PA, PR, RI, SC, SD, TN, TX, UT, VA, VI, VT, WA, WI, WV, WY',

			'CA': 'AB, BC, MB, NB, NL, NS, ON, PE, QC, SK, NT, NU, YT'
		};

		// cookie expiration in days
		var cookieExpirationInDays = 3;

		var dishSearchParams = 'q&vegan&vegetarian&gluten_free&min_price&max_price&nationality&sortBy&city&distance';

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
			payoutCountries: payoutCountries,
			states: states,
			currency: currency,
			dishSearchParams: dishSearchParams,
			carouselDefaultInterval: carouselDefaultInterval,
			stripePublishableKey: stripePublishableKey,
		};

	})());
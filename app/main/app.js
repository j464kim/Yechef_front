'use strict';

angular
	.module('yechefFrontApp', [
		// angular modules
		'ngAnimate',
		'ngCookies',
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'ngTouch',
		'ngRateIt',
		'ngMessages',
		'xeditable',
		'ngMessages',
		'ngMaterial',
		'ngMaterialDatePicker',
		'directive.loader',
		'angular-loading-bar',

		// libraries
		'ui.router',
		'ui.mask',
		'satellizer',
		'ui.bootstrap',
		'http-auth-interceptor',
		'uiGmapgoogle-maps',

		// main modules
		'main',
		'style-guide',
		'dish',
		'rating',
		'kitchen',
		'user',
		'checkout',
		'profile',
		'cart',
		'userKitchen',
		'mediaUpload',
		'reaction',
		'directive.confirmPassword',
		'helper',
		'header',
		'footer',


		// services
		'http.interceptor',
		'auth.api',

		// configuration
		'configuration',

		// dev helper
		'dev',
	])
	.config(function (
		$stateProvider, 
		$urlRouterProvider, 
		$httpProvider, 
		uiGmapGoogleMapApiProvider, 
		$mdThemingProvider, 
		$provide
	) {
		//push http interceptor
		$httpProvider.interceptors.push('httpRequestInterceptor');

		// Default route
		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'components/main/homepage.html',
			});

		// For any unmatched url, redirect to /
		$urlRouterProvider.otherwise('/');

		uiGmapGoogleMapApiProvider.configure({
			key: 'AIzaSyDr7nGo9_dS9bzUh_325enuj_lpcDt5Bz0',
			v: '3.27', //defaults to latest 3.X anyhow
			libraries: 'geometry,visualization'
		});

		$mdThemingProvider.generateThemesOnDemand(true);
		$provide.value('themeProvider', $mdThemingProvider);
		// $mdThemingProvider.definePalette('amazingPaletteName', {
		// 	'50': 'ffebee',
		// 	'100': 'ffcdd2',
		// 	'200': 'ef9a9a',
		// 	'300': 'e57373',
		// 	'400': 'ef5350',
		// 	'500': config.primaryColor,
		// 	'600': 'e53935',
		// 	'700': 'd32f2f',
		// 	'800': 'c62828',
		// 	'900': 'b71c1c',
		// 	'A100': 'ff8a80',
		// 	'A200': 'ff5252',
		// 	'A400': 'ff1744',
		// 	'A700': 'd50000',
		// 	'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
		// 										// on this palette should be dark or light

		// 	'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
		// 	 '200', '300', '400', 'A100'],
		// 	'contrastLightColors': undefined    // could also specify this if default was 'dark'
		// 	});

		// $mdThemingProvider.theme('default')
		// 	.primaryPalette('amazingPaletteName');
		// 	// .accentPalette('amazingPaletteName')
		// 	// .warnPalette('amazingPaletteName')
	})
	.run(function (editableOptions) {
		editableOptions.theme = 'bs3'; //bootstrap3 theme. Can be also 'bs2', 'default'
	});

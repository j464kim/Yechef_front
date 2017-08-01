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
		'directive.card.dish',
		'directive.card.kitchen',
		'directive.button',

		// libraries
		'ui.router',
		'ui.mask',
		'satellizer',
		'ui.bootstrap',
		'http-auth-interceptor',
		'uiGmapgoogle-maps',
		'google.places',

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
		'directive.themePixel',
		'helper',
		'header',
		'footer',


		// services
		'http.interceptor',
		'auth.api',
		'search.api',
		'map.api',
		'map.service',

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
	})
	.run(function (editableOptions) {
		editableOptions.theme = 'bs3'; //bootstrap3 theme. Can be also 'bs2', 'default'
	});

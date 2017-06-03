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

        // libraries
        'ui.router',
        'satellizer',
        'ui.bootstrap',
        'http-auth-interceptor',

		// main modules
		'dish',
		'kitchen',
        'user',
		'mediaUpload',

        // services
        'http.interceptor',
        'auth.api',
        'main.controller',

        // configuration
        'configuration',

        // dev helper
        'dev',
    ])
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
        //push http interceptor
        $httpProvider.interceptors.push('httpRequestInterceptor');

		// Default route
		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'homepage/template.html',
			});

		// For any unmatched url, redirect to /
		$urlRouterProvider.otherwise('/');
	});

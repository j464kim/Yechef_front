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
        'xeditable',
        'ngMaterial',
        'ngMaterialDatePicker',

        // libraries
        'ui.router',
        'ui.mask',
        'satellizer',
        'ui.bootstrap',
        'http-auth-interceptor',
        'uiGmapgoogle-maps',

        // main modules
        'style-guide',
        'dish',
        'rating',
        'kitchen',
        'user',
        'profile',
        'mediaUpload',
		'reaction',

        // services
        'http.interceptor',
        'auth.api',
        'main.controller',

        // configuration
        'configuration',

        // dev helper
        'dev',
    ])
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider, uiGmapGoogleMapApiProvider) {
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

        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyDr7nGo9_dS9bzUh_325enuj_lpcDt5Bz0',
            v: '3.27', //defaults to latest 3.X anyhow
            libraries: 'geometry,visualization'
        });
    })
    .run(function (editableOptions) {
        editableOptions.theme = 'bs3'; //bootstrap3 theme. Can be also 'bs2', 'default'
    });

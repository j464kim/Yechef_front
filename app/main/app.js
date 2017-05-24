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

        // libraries
        'ui.router',
        'satellizer',
        'ui.bootstrap',

        // main modules
        'dish',
        'rating',
        'kitchen',
        'user',
        'mediaUpload',

        // services
        'http.interceptor',

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
    })
    .run(function (editableOptions) {
        editableOptions.theme = 'bs3'; //bootstrap3 theme. Can be also 'bs2', 'default'
    });

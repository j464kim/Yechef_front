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
        'ngMaterial',

        // libraries
        'ui.router',
        'ui.mask',
        'satellizer',
        'ui.bootstrap',
        'http-auth-interceptor',

        // main modules
        'style-guide',
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

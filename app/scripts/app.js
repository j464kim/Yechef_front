'use strict';

/**
 * @ngdoc overview
 * @name yechefFrontApp
 * @description
 * # yechefFrontApp
 *
 * Main module of the application.
 */
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

        // route
        'routes',

        // services
        'http.interceptor',
    ])
    .config(function ($urlRouterProvider, $httpProvider) {
        //push http interceptor
        $httpProvider.interceptors.push('httpRequestInterceptor');

    });

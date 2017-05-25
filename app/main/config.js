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


        // social configurations
        var facebookAppId = '789389204557240';
        var googleAppId = '716914948245-t5k325iea7jmqhk8kolu59cdt6v4ssrr.apps.googleusercontent.com';


        // cookie expiration in days
        var cookieExpirationInDays = 3;

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
            facebookAppId : facebookAppId,
            googleAppId: googleAppId,
            cookieExpirationInDays: cookieExpirationInDays
        };

    })());
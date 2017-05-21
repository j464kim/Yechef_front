'use strict';

angular.module('http.interceptor', [
    'configuration'
])

    .factory('httpRequestInterceptor', ['$q', 'config', '$timeout', '$injector', 'localStorageService',
        function ($q, config, $timeout, $injector, localStorageService) {

            var $http, $auth;
            $timeout(function () {
                $http = $injector.get('$http');
                $auth = $injector.get('AuthAPI');
            });

            var request = function (httpConfig) {
                httpConfig.headers = httpConfig.headers || {};
                httpConfig.params = httpConfig.params || {};

                var token = localStorageService.get('access_token');

                // manage refresh token
                if(token){
                    // if token expire
                    var expires = localStorageService.get('expires_at');
                    if(expires && expires < Date.now()){
                        // re-new token
                        return $auth.refreshToken().then(function(token){
                            config.headers.Authorization = token;
                            return config;
                        });
                    } else {
                        config.headers.Authorization = token;
                    }
                }
                
                // insert PHPStorm debug session when in debug mode
                if(config.debugMode === true){
                    httpConfig.params.XDEBUG_SESSION_START = "PHPSTORM";
                }
                return httpConfig;
            };


            var response = function (response) {
                var httpCode = response.status;
                
                // if unautherized, refresh access token
                if (httpCode === 403) {
                    return $auth.refreshToken().then(
                        function () {
                            return $http(response.config);
                        },
                        function () {
                            return $q.reject(response);
                    });
                }


                if (config.debugMode === true) {
                    if (httpCode !== 200) {
                        console.error('##Response Status of ' + httpCode + ' returned');
                        console.error('##Response Body: ', response);
                    }
                }
                return response;
            };

            return {
                request: request,
                response: response
            };
        }
    ]);
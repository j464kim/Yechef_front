'use strict';

angular.module('http.interceptor', [
    'configuration'
])

    .factory('httpRequestInterceptor', ['$q', 'config', 'localStorageService',
        function ($q, config, localStorageService) {

            var request = function (httpConfig) {
                httpConfig.headers = httpConfig.headers || {};

                httpConfig.headers.Authorization = 'Bearer ' + localStorageService.get('access_token');

                httpConfig.params = httpConfig.params || {};
                // inser PHPStorm debug session when in debug mode
                // console.log(httpConfig);
                if(config.debugMode === true){
                    //TODO: This breaks the ng-rate-it template from being loaded.
                    // httpConfig.params.XDEBUG_SESSION_START = "PHPSTORM";
                }
                return httpConfig;
            };


            var response = function (response) {
                if (config.debugMode === true) {
                    var httpCode = response.status;
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
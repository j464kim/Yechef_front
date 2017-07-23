'use strict';

angular
    .module('http.interceptor', [
        'configuration'
    ])

    .factory('httpRequestInterceptor', ['$q', 'config', 'sessionService', 'devHelper',
        function ($q, config, sessionService, devHelper) {

            var request = function (httpConfig) {
                httpConfig.headers = httpConfig.headers || {};

                httpConfig.headers.Authorization = sessionService.getAccessToken();

                httpConfig.params = httpConfig.params || {};
                // inser PHPStorm debug session when in debug mode
                if(config.debugMode === true){
                    //TODO: This breaks the ng-rate-it template from being loaded.
                    // httpConfig.params.XDEBUG_SESSION_START = "PHPSTORM";
                }
                return httpConfig;
            };


            var response = function (response) {
                var httpCode = response.status;

                if (config.debugMode === true) {
                    if (httpCode !== 200) {
						devHelper.log('##Response Status of ' + httpCode + ' returned', 'error');
						devHelper.log('##Response Body: ', 'error');
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
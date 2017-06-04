'use strict';

angular
    .module('http.interceptor', [
        'configuration'
    ])

    .factory('httpRequestInterceptor', ['$q', 'config', 'sessionService',
        function ($q, config, sessionService) {

            var request = function (httpConfig) {
                httpConfig.headers = httpConfig.headers || {};

                httpConfig.headers.Authorization = sessionService.getAccessToken();

                httpConfig.params = httpConfig.params || {};
                // inser PHPStorm debug session when in debug mode
                if(config.debugMode === true){
                    httpConfig.params.XDEBUG_SESSION_START = "PHPSTORM";
                }
                return httpConfig;
            };


            var response = function (response) {
                var httpCode = response.status;

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
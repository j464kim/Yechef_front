'use strict';

angular.module('http.interceptor', [
    'configuration'
])

    .factory('httpRequestInterceptor', ['$q', 'config',
        function ($q, config) {

            var request = function (config) {
                return config;
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
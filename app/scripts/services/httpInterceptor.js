'use strict';

angular.module('http.interceptor', [])

.factory('httpRequestInterceptor', ['$q', 'constant', function ($q, constant) {

	var request = function(config) {
		return config;
	};


	var response = function(response) {
		if(constant.debugMode === true){
			var httpCode = response.status;
			if(httpCode !== 200){
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
}]);
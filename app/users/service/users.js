'use strict';

angular.module('user.api', [
	'configuration'
])

.factory('UserResource', ['$resource', 'config', 
	function($resource, config) {
		var api_endpoint = config.endpoint + 'dishes/';

		return $resource(api_endpoint + ':id', {id: '@id'},{
			list: {
				method: 'GET',
			},
		});
	}
])

.factory('AuthResource', ['$resource', 'config',
	function($resource, config) {
		var api_endpoint = 'http://laravel.dev/oauth/clients';

		return $resource(api_endpoint + ':id', {id: '@id'},{
			login: {
				method: 'GET',
			},
		});
	}
])

.service('UserAPI', ['$q', 'UserResource', 'AuthResource', 
	function($q, UserResource, AuthResource){

		function login() {

			return $q(function(resolve, reject) {
				AuthResource.login().$promise.then(function(response){
					resolve(response.body);
				}, function(response) {
					reject(response)
				});
			});
		};



		return {
			login: login,
		};
	}
]);
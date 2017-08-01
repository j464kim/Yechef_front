'use strict';

angular.module('search.api', [
	'configuration'
])

	.factory('SearchResource', ['$resource', 'config',
		function ($resource, config) {
			var api_endpoint = config.endpoint + 'search/';

			return $resource(api_endpoint + ':id', {id: '@id'}, {
				dish: {
					method: 'GET',
					url: api_endpoint + 'dishes'
				},
			});
		}
	])

	.service('SearchAPI', ['$q', 'SearchResource',
		function ($q, SearchResource) {

			function dish(options) {
				options.page = options.page || 0;
				//Convert km to m
				options.distance *= 1000;
				return $q(function (resolve, reject) {
					SearchResource.dish(
						options
					).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response)
					});
				});
			};

			return {
				dish: dish,
			};
		}
	]);
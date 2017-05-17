'use strict';

angular.module('media.api', [
	'configuration'
])

	.factory('MediaResource', ['$resource', 'config',
		function ($resource, config) {
			var apiEndpoint = config.endpoint + 'media/';

			return $resource(apiEndpoint + ':id', {id: '@id'}, {

				create: {
					method: 'POST'
				},

				destroy: {
					method: 'DELETE'
				}
			});
		}
	])

	.service('MediaAPI', ['$q', 'MediaResource',
		function ($q, MediaResource) {

			function create(media) {

				return $q(function (resolve, reject) {
					MediaResource.create(media)
						.$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			}

			return {
				create: create,
				destroy: destroy
			};
		}
	]);

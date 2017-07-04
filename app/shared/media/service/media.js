'use strict';

angular.module('media.api', [
	'configuration'
])

	.factory('MediaResource', ['$resource', 'config',
		function ($resource, config) {
			var apiEndpoint = config.endpoint + 'media/';
			return $resource(apiEndpoint + ':id' + '/' + ':modelName', {id: '@id', modelName: '@modelName'}, {
				show: {
					method: 'GET'
				},
				destroy: {
					method: 'DELETE'
				},
			});
		}
	])

	.service('MediaAPI', ['$q', 'MediaResource',
		function ($q, MediaResource) {

			function show(modelName, mediableId) {

				return $q(function (resolve, reject) {
					MediaResource.show(
						{
							modelName: modelName,
							id: mediableId
						}
					)
						.$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			}

			function destroy(mediableId) {

				return $q(function (resolve, reject) {
					MediaResource.destroy(
						{
							id: mediableId
						}
					)
						.$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			}

			return {
				show: show,
				destroy: destroy,
			};
		}
	]);

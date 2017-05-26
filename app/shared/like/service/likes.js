'use strict';

angular.module('like_api', [
	'configuration'
])

	.factory('LikeResource', ['$resource', 'config',
		function ($resource, config) {
			var apiEndpoint = config.endpoint + 'likes/';
			return $resource(apiEndpoint + ':id', {id: '@id'}, {
				index: {
					method: 'POST'
				},
				store: {
					method: 'POST'
				},
				destroy: {
					method: 'DELETE'
				}
			});
		}
	])

	.service('LikeAPI', ['$q', 'LikeResource',
		function ($q, LikeResource) {

			function index(reactionObj, getReactions) {

				return $q(function (resolve, reject) {
					LikeResource.index(
						reactionObj,
						{
							id: getReactions
						}
					)
						.$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			}

			function store(likeObject) {

				return $q(function (resolve, reject) {
					LikeResource.store(likeObject)
						.$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			}

			function destroy(reactionObj, reactionId) {

				return $q(function (resolve, reject) {
					LikeResource.destroy(
						reactionObj,
						{
							id: reactionId
						}
					).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			}

			return {
				index: index,
				store: store,
				destroy: destroy
			};
		}
	]);

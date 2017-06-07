'use strict';

angular.module('reaction_api', [
	'configuration'
])

	.factory('ReactionResource', ['$resource', 'config',
		function ($resource, config) {
			var apiEndpoint = config.endpoint + 'reactions/';
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

	.service('ReactionAPI', ['$q', 'ReactionResource',
		function ($q, ReactionResource) {

			function index(reactionObj, getReactions) {

				return $q(function (resolve, reject) {
					ReactionResource.index(
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

			function store(reactionObj) {

				return $q(function (resolve, reject) {
					ReactionResource.store(reactionObj)
						.$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			}

			function destroy(reactionObj, reactionId) {

				return $q(function (resolve, reject) {
					ReactionResource.destroy(
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

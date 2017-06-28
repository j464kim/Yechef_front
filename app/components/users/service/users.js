'use strict';

angular.module('user.api', [])

	.factory('UserResource', ['$resource', 'config',
		function ($resource, config) {
			var api_endpoint = config.endpoint + 'users/';

			return $resource(api_endpoint + ':id', {id: '@id'}, {
				list: {
					method: 'GET'
				},
				show: {
					method: 'GET'
				},
				update: {
					method: 'PUT'
				},
			});
		}
	])

	.service('UserAPI', ['$q', 'UserResource',
		function ($q, UserResource) {

			function list(option) {

				return $q(function (resolve, reject) {
					UserResource.list({
						id: option,
					}).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						console.log(seconds, expireAt);
						reject(response);
					});
				});
			};

			function show(userId) {

				return $q(function (resolve, reject) {
					UserResource.show(
						{
							id: userId
						}
					).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			}

			function update(user, userId) {
				return $q(function (resolve, reject) {
					UserResource.update(user, userId)
						.$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			}

			return {
				list: list,
				show: show,
				update: update,
			};
		}
	]);

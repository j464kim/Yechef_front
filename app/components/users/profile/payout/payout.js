'use strict';

angular.module('payout.api', [
	'configuration'
])

	.factory('PayoutResource', ['$resource', 'config',
		function ($resource, config) {
			var api_endpoint = config.endpoint + 'payout/';

			return $resource(api_endpoint + ':id', {id: '@id'}, {
				list: {
					method: 'GET'
				},
				create: {
					method: 'POST'
				}
			});
		}
	])

	.service('PayoutAPI', ['$q', 'PayoutResource',
		function ($q, PayoutResource) {

			function createAccount() {
				return $q(function (resolve, reject) {
					PayoutResource.create()
						.$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			}

			function getAccount() {
				return $q(function (resolve, reject) {
					PayoutResource.list()
						.$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			}

			return {
				getAccount: getAccount,
				createAccount: createAccount,
			};
		}
	]);

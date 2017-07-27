'use strict';

angular.module('payout.api', [
	'configuration'
])

	.factory('PayoutResource', ['$resource', 'config',
		function ($resource, config) {
			var api_endpoint = config.endpoint + 'payout/';

			return $resource(api_endpoint + ':id', {id: '@id'}, {
				create: {
					method: 'POST'
				},
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

			return {
				createAccount: createAccount,
			};
		}
	]);

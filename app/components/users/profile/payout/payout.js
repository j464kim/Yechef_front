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
				show: {
					method: 'GET'
				},
				create: {
					method: 'POST'
				},
				update: {
					method: 'PUT'
				},
			});
		}
	])

	.service('PayoutAPI', ['$q', 'PayoutResource',
		function ($q, PayoutResource) {

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

			function showAccount(payoutId) {
				return $q(function (resolve, reject) {
					PayoutResource.show({
						id: payoutId
					}).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			}

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

			function updateAddress(address, accountId) {
				return $q(function (resolve, reject) {
					PayoutResource.update({
							id: accountId
						}, address
					).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			}

			function createExternalAccount(token) {
				return $q(function (resolve, reject) {
					PayoutResource.create({
							id: 'externalAccount'
						}, token
					).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			}

			return {
				getAccount: getAccount,
				showAccount: showAccount,
				createAccount: createAccount,
				updateAddress: updateAddress,
				createExternalAccount: createExternalAccount
			};
		}
	]);

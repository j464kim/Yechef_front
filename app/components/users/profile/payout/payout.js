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
				},
				update: {
					method: 'PUT'
				},
				destroy: {
					method: 'DELETE'
				},
				switchDefault: {
					method: 'POST',
					url: api_endpoint + 'externalAccount/switchDefault',
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

			function getExternalAccounts() {
				return $q(function (resolve, reject) {
					PayoutResource.list({
						id: 'externalAccount'
					}).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			}

			function createAccount(payoutAddress) {
				return $q(function (resolve, reject) {
					PayoutResource.create(payoutAddress)
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

			function updateInfo(personalInfo, accountId) {
				return $q(function (resolve, reject) {
					PayoutResource.update({
							id: accountId + '/personalInfo'
						}, personalInfo
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

			function deleteExternalAccount(externalAccountId) {
				return $q(function (resolve, reject) {
					PayoutResource.destroy({
							id: 'externalAccount/' + externalAccountId
						}
					).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			}

			function switchDefaultExternalAccount(externalAccountId) {
				console.log(externalAccountId);
				return $q(function (resolve, reject) {
					PayoutResource.switchDefault({
						id: externalAccountId
					})
						.$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			}

			return {
				getAccount: getAccount,
				getExternalAccounts: getExternalAccounts,
				createAccount: createAccount,
				updateAddress: updateAddress,
				updateInfo: updateInfo,
				createExternalAccount: createExternalAccount,
				deleteExternalAccount: deleteExternalAccount,
				switchDefaultExternalAccount: switchDefaultExternalAccount,
			};
		}
	]);

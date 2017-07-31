'use strict';

angular.module('user.profile.payout.show', [
	'payout.api', 'ngMaterial'
])

	.controller('PayoutShowController', ['$stateParams', '$state', 'PayoutAPI', 'CheckoutService', 'devHelper', 'genericService', 'config',
		function ($stateParams, $state, PayoutAPI, CheckoutService, devHelper, genericService, config) {

			/*********************
			 *  Private Variables
			 **********************/
			/*********************
			 *  Public Variables
			 **********************/
			var that = this;
			this.payoutCountries = genericService.loadItems(config.payoutCountries);
			this.accountHolderTypes = [
				'individual', 'company'
			];

			/*********************
			 *  Private Functions
			 **********************/
			function _init() {
				_getExternalAccounts();
			}

			function _getExternalAccounts() {
				PayoutAPI.getExternalAccounts()
					.then(function (response) {
						that.externalAccounts = response.data;
						devHelper.log(that.externalAccounts);
						devHelper.log('Successfully retrieved Payout Account of the user');
					}, function (response) {
						// TODO handle error state-*/ ˙
						devHelper.log(response, 'error');
					})
			}

			function _createExternalAccount() {
				CheckoutService.tokenizeBankAccount(that.bankAccount)
					.then(function (response) {
						that.bankAccount.token = response.id;
						PayoutAPI.createExternalAccount(that.bankAccount)
							.then(function (response) {
								devHelper.log(response);
								devHelper.log('External account updated successfully');
								$state.go('user.profile.payout.list');
							}, function (response) {
								// TODO handle error state-*/ ˙
								devHelper.log(response, 'error');
							})
					})
			}

			/*********************
			 *  Public Functions
			 **********************/
			this.createExternalAccount = _createExternalAccount;
			this.getCurrency = genericService.getCurrency;

			/*********************
			 *  Initialization
			 **********************/
			_init();

			/*********************
			 *  EVENTS
			 **********************/

		}
	]);

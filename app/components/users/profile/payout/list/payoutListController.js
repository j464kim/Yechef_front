'use strict';

angular.module('user.profile.payout.list', [
	'payout.api', 'ngMaterial'
])

	.controller('PayoutListController', ['$stateParams', '$state', 'PayoutAPI', 'CheckoutService', 'devHelper', 'genericService', 'config',
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
				_getPayoutAccount();
			}

			function _getPayoutAccount() {
				PayoutAPI.getAccount()
					.then(function (response) {
						devHelper.log(response);
						that.account = response;
						devHelper.log('Successfully retrieved the list of Payout Account of the user');
					}, function (response) {
						// TODO handle error state-*/ ˙
						devHelper.log(response, 'error');
					})
			}

			function _updateAddress() {
				devHelper.log(that.address);
				that.address.state = that.selectedState.display;
				PayoutAPI.updateAddress(that.address, that.account.id)
					.then(function (response) {
						devHelper.log(response);
						that.account = response;
						devHelper.log('Successfully updated address of the payout account');
						$state.go('user.profile.payout.list');
					}, function (response) {
						// TODO handle error state-*/ ˙
						devHelper.log(response, 'error');
					})
			}

			function _createExternalAccount() {
				that.bankAccount.country = that.account.country;
				that.bankAccount.currency = that.account.default_currency;
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
			this.updateAddress = _updateAddress;
			this.createExternalAccount = _createExternalAccount;
			this.getStates = genericService.getStates;
			this.querySearch = genericService.querySearch;

			/*********************
			 *  Initialization
			 **********************/
			_init();

			/*********************
			 *  EVENTS
			 **********************/

		}
	]);

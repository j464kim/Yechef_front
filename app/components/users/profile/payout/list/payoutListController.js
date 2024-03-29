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
			this.hasAccount = false;
			this.hasNoAccount = false;

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
						if (that.account) {
							that.hasAccount = true
						} else {
							that.hasNoAccount = true;
						}
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

			/*********************
			 *  Public Functions
			 **********************/
			this.updateAddress = _updateAddress;
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

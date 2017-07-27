'use strict';

angular.module('user.profile.payout.create', [
	'payout.api', 'ngMaterial'
])

	.controller('PayoutCreateController', ['$stateParams', '$state', 'PayoutAPI', 'CheckoutService', 'devHelper', 'genericService', 'config',
		function ($stateParams, $state, PayoutAPI, CheckoutService, devHelper, genericService, config) {

			/*********************
			 *  Private Variables
			 **********************/

			/*********************
			 *  Public Variables
			 **********************/
			var that = this;
			this.payoutCountries = genericService.loadItems(config.payoutCountries);

			/*********************
			 *  Private Functions
			 **********************/

			function _createAccount() {
				console.log('creating payout account..');
				PayoutAPI.createAccount().then(function (response) {
					devHelper.log(response);
					devHelper.log('Successfully created Payout Account for the user');
					$state.go('user.kitchen.payout.new.method.select');
				}, function (response) {
					// TODO handle error state-*/ ˙
					devHelper.log(response, 'error');
				})
			}

			/*********************
			 *  Public Functions
			 **********************/
			this.createAccount = _createAccount;
			this.getStates = genericService.getStates;
			this.querySearch = genericService.querySearch;

			/*********************
			 *  Initialization
			 **********************/

			/*********************
			 *  EVENTS
			 **********************/

		}
	]);

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

			/*********************
			 *  Private Functions
			 **********************/
			function _init() {
				_getPayoutAccount();
			}

			function _getPayoutAccount() {
				console.log('retrieving payout account..');
				PayoutAPI.getAccount().then(function (response) {
					devHelper.log(response);
					that.account = response;
					devHelper.log('Successfully retrieved Payout Account of the user');
				}, function (response) {
					// TODO handle error state-*/ ˙
					devHelper.log(response, 'error');
				})
			}

			/*********************
			 *  Public Functions
			 **********************/

			/*********************
			 *  Initialization
			 **********************/
			_init();

			/*********************
			 *  EVENTS
			 **********************/

		}
	]);

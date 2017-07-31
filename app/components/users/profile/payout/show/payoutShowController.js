'use strict';

angular.module('user.profile.payout.show', [
	'payout.api', 'ngMaterial'
])

	.controller('PayoutShowController', ['$stateParams', '$state', 'PayoutAPI', 'CheckoutService', 'devHelper',
		function ($stateParams, $state, PayoutAPI, CheckoutService, devHelper) {

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

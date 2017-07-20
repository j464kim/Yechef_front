'use strict';

angular.module('user.profile.payment', [
	'user.api', 'ngMaterial'
])

	.controller('UserPaymentController', ['$stateParams', '$state', 'CheckoutAPI', 'devHelper', '$scope',
		function ($stateParams, $state, CheckoutAPI, devHelper, $scope) {

			/*********************
			 *  Private Variables
			 **********************/
				// reference to this controller

			var that = this;
			/*********************
			 *  Public Variables
			 **********************/

			/*********************
			 *  Private Functions
			 **********************/

			function _init() {
				_getPayment();
			}

			function _getPayment() {
				CheckoutAPI.list().then(
					function (response) {
						console.log('get paymnet');
						console.log(response);
						devHelper.log(response);
						that.customer = response;
					}, function (response) {
						// TODO handle error state ie. front end display
						console.error(response);
					});
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

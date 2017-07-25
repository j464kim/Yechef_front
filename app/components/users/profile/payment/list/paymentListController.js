'use strict';

angular.module('user.profile.payment', [
	'payment.api', 'ngMaterial'
])

	.controller('PaymentListController', ['$stateParams', '$state', 'PaymentAPI', 'devHelper', '$scope', '$rootScope',
		function ($stateParams, $state, PaymentAPI, devHelper, $scope, $rootScope) {

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
				console.log('current usr');
				devHelper.log($rootScope.currentUser);
			}

			function _getPayment() {
				PaymentAPI.getCards().then(
					function (response) {
						devHelper.log(response);
						that.customer = response;
					}, function (response) {
						// TODO handle error state ie. front end display
						devHelper.log(response, 'error');
					});
			}

			function _removeCard(cardId) {
				PaymentAPI.removeCard(cardId).then(function (response) {
					devHelper.log(response);
					devHelper.log('Card has been deleted successfully');
					$state.reload();
				}, function (response) {
					// TODO handle error state-*/ ˙
					devHelper.log(response, 'error');
				})
			}

			/*********************
			 *  Public Functions
			 **********************/
			this.removeCard = _removeCard;

			/*********************
			 *  Initialization
			 **********************/
			_init();


			/*********************
			 *  EVENTS
			 **********************/

		}
	]);

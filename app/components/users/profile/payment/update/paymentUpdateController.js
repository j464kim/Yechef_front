'use strict';

angular.module('user.profile.payment.update', [
	'payment.api', 'ngMaterial'
])

	.controller('PaymentUpdateController', ['$stateParams', '$state', 'PaymentAPI', 'CheckoutService', 'devHelper',
		function ($stateParams, $state, PaymentAPI, CheckoutService, devHelper) {

			/*********************
			 *  Private Variables
			 **********************/

			/*********************
			 *  Public Variables
			 **********************/
			var that = this;
			var index = $stateParams.index;

			/*********************
			 *  Private Functions
			 **********************/
			function _init() {
				_showCard();
			}

			function _showCard() {
				PaymentAPI.showCard(index).then(function (response) {
					that.cardToUpdate = response;
					devHelper.log(that.cardToUpdate);
				}, function (response) {
					// TODO handle error state-*/ ˙
					devHelper.log(response, 'error');
				})
			}

			function _updateCard() {
				PaymentAPI.updateCard(that.card, that.cardToUpdate.id).then(function (response) {
					devHelper.log(response);
					devHelper.log('Card has been updated successfully');
					$state.go('user.profile.payment.list');
				}, function (response) {
					// TODO handle error state-*/ ˙
					devHelper.log(response, 'error');
				})

			}

			/*********************
			 *  Public Functions
			 **********************/
			this.updateCard = _updateCard;

			/*********************
			 *  Initialization
			 **********************/
			_init();

			/*********************
			 *  EVENTS
			 **********************/

		}
	]);

'use strict';

angular.module('user.profile.payment.update', [
	'user.api', 'ngMaterial'
])

	.controller('PaymentUpdateController', ['$stateParams', '$state', 'CheckoutAPI', 'CheckoutService', 'devHelper',
		function ($stateParams, $state, CheckoutAPI, CheckoutService, devHelper) {

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
				console.log(index);
				CheckoutAPI.showCard(index).then(function (response) {
					that.cardToUpdate = response;
					devHelper.log(that.cardToUpdate);
				}, function (response) {
					// TODO handle error state-*/ ˙
					console.error(response);
				})
			}

			function _updateCard() {
				console.log(that.cardToUpdate.id);
				CheckoutAPI.updateCard(that.card, that.cardToUpdate.id).then(function (response) {
					devHelper.log(response);
					devHelper.log('Card has been updated successfully');
					$state.go('user.profile.payment.list');
				}, function (response) {
					// TODO handle error state-*/ ˙
					console.error(response);
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

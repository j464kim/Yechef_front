angular.module('user.kitchen.subscriber', [
	'ngMaterial',
])

	.controller('kitchenSubscriberController', function ($scope, $timeout, $mdSidenav, devHelper, UserAPI, KitchenAPI, $state, $stateParams, DishesAPI) {
		var that = this;

		this.myCurrentKitchenId = $stateParams.myCurrentKitchenId;

		function _init() {
			_getSubscribers();
		}

		function _getSubscribers() {
			KitchenAPI.getSubscribers(that.myCurrentKitchenId).then(function (response) {
				devHelper.log(response);
				that.subscribers = response;
			}, function (response) {
				//TODO handle error state
				devHelper.log(response, 'error');
			});
		}

		_init();

	});



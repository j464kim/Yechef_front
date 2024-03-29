angular.module('user.kitchen.subscriber', [
	'ngMaterial',
])

	.controller('kitchenSubscriberController', function ($scope, $timeout, $mdSidenav, devHelper, UserAPI, KitchenAPI, $state, $stateParams, genericService) {
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
				genericService.showToast('Oops..! Something is wrong');
				devHelper.log(response, 'error');
			});
		}

		_init();

	});



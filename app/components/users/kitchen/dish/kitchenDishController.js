angular.module('user.kitchen.dish', [
	'ngMaterial',
])

	.controller('kitchenDishController', function ($scope, $timeout, $mdSidenav, devHelper, UserAPI, KitchenAPI, $state, $stateParams, $q, genericService, $mdToast) {
		var that = this;

		this.myCurrentKitchenId = $stateParams.myCurrentKitchenId;

		function _init() {
			_getDishes();
		}

		function _getDishes() {
			KitchenAPI.getDishes(that.myCurrentKitchenId).then(function (response) {
				devHelper.log(response);
				that.dishes = response;
			}, function (response) {
				//TODO handle error state
				console.error(response);
			});
		}

		_init();

	});



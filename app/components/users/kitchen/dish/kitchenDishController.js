angular.module('user.kitchen.dish', [
	'ngMaterial',
])

	.controller('kitchenDishController', function ($scope, $timeout, $mdSidenav, devHelper, UserAPI, KitchenAPI, $state, $stateParams, DishesAPI) {
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
				devHelper.log(response, 'error');
			});
		}

		function _destroyDish(dishId) {
			devHelper.log(dishId);
			//TODO: Probably better to use ng directive to handle confirmation popup
			if (confirm("Do you want to delete the dish?")) {
				DishesAPI.destroy(dishId)
					.then(function (response) {
						_getDishes();
					}, function (response) {
						// TODO handle error state
						devHelper.log(response, 'error');
					});
			}
		}

		this.destroyDish = _destroyDish;

		_init();

	});



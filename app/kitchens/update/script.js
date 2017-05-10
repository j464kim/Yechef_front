'use strict';

angular.module('kitchen.update', [
	'kitchen.api'
])

	.controller('KitchenUpdateController', ['$stateParams', 'KitchenAPI', '$scope', '$location',
		function ($stateParams, KitchenAPI, $scope, $location) {

			/*********************
			 *  Private Variables
			 **********************/
				// reference to this controller

			var kitchenId = $stateParams.id;
			/*********************
			 *  Public Variables
			 **********************/

			/*********************
			 *  Private Functions
			 **********************/

			function _init() {
				_getKitchen();
			}

			function _getKitchen() {
				KitchenAPI.show(kitchenId).then(function (response) {
					console.log(response);
					$scope.kitchen = response;
				}, function (response) {
					// TODO handle error state
					console.error(response);
				});
			}

			function _updateKitchen() {
				KitchenAPI.update($scope.kitchen, kitchenId).then(function (response) {
					var updatedKitchen = response;
					console.log(response);
					$location.path('/kitchens/' + updatedKitchen.id);
				}, function (response) {
					// TODO handle error state
					console.error(response);
				});
			}

			/*********************
			 *  Public Functions
			 **********************/
			this.updateKitchen = _updateKitchen;


			/*********************
			 *  Initialization
			 **********************/
			_init();


			/*********************
			 *  EVENTS
			 **********************/

		}
	]);

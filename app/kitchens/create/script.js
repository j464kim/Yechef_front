'use strict';

angular.module('kitchen.create', [
	'kitchen.api'
])

	.controller('KitchenCreateController', ['$state', 'KitchenAPI', '$scope',
		function ($state, KitchenAPI, $scope) {

			/*********************
			 *  Private Variables
			 **********************/
				// reference to this controller

			/*********************
			 *  Public Variables
			 **********************/

			/*********************
			 *  Private Functions
			 **********************/

			function _createKitchen() {
				KitchenAPI.create($scope.kitchen).then(function (response) {
					var newKitchen = response;
					console.log(response);
					$state.go('kitchen.show', {'id': newKitchen.id});
				}, function (response) {
					// TODO handle error state
					console.error(response);
				});
			}

			/*********************
			 *  Public Functions
			 **********************/
			this.createKitchen = _createKitchen;


			/*********************
			 *  Initialization
			 **********************/

			/*********************
			 *  EVENTS
			 **********************/

		}
	]);

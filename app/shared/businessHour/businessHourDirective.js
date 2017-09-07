'use strict';

angular.module('businessHour', [
	'kitchen.api'
])

	.directive('businessHour', function () {
		return {
			scope: {
				day: "@",
				active: "@", //import referenced model to our directives scope
				open: "@",
				close: "@"
			},
			templateUrl: 'shared/businessHour/businessHourDirective.html',
			controller: function ($scope, $stateParams, KitchenAPI, devHelper, genericService, config) {

				// $scope.active = true;
				var myCurrentKitchenId = $stateParams.myCurrentKitchenId;

				function _init() {
					// conversion of 0 and 1 to boolean expression
					$scope.isOpen = !!+$scope.active;
					$scope.label = config.day[$scope.day];
					$scope.settings = {
						dropdownToggleState: false,
						time: {
							fromHour: $scope.open.split('_')[0],
							fromMinute: $scope.open.split('_')[1],
							toHour: $scope.close.split('_')[0],
							toMinute: $scope.close.split('_')[1]
						},
						theme: 'light',
						noRange: false,
						format: 24,
						noValidation: false
					};
				}

				$scope.toggleBusinessHour = function () {
					KitchenAPI.toggleBusinessHour(myCurrentKitchenId, $scope.day, $scope.isOpen).then(function (response) {
						devHelper.log(response);
						devHelper.log('toggled business hours');
					}, function (response) {
						genericService.showToast('Oops..! Something is wrong');
						devHelper.log(response, 'error');
					});
				};

				$scope.onApplyTimePicker = function (time) {
					var open = time.fromHour + '_' + time.fromMinute;
					var close = time.toHour + '_' + time.toMinute;

					devHelper.log(time);

					KitchenAPI.updateBusinessHour(myCurrentKitchenId, $scope.day, open, close).then(function (response) {
						devHelper.log(response);
						devHelper.log('updated business hours');
					}, function (response) {
						genericService.showToast('Oops..! Something is wrong');
						devHelper.log(response, 'error');
					});
				};

				$scope.onClearTimePicker = function () {
					// custom action on clear time picker if wanted
				};

				_init();
			}

		}
	});
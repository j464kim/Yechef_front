'use strict';

angular.module('businessHour', [
	'kitchen.api'
])

	.directive('businessHour', function () {
		return {
			scope: {
				day: "@",
				label: "@",
				active: "@", //import referenced model to our directives scope
			},
			templateUrl: 'shared/businessHour/businessHourDirective.html',
			controller: function ($rootScope, $scope, $state, $stateParams, KitchenAPI, devHelper, genericService) {
				// Set initial time range to be 09:30 - 17:00
				$scope.settings = {
					dropdownToggleState: false,
					time: {
						fromHour: '09',
						fromMinute: '00',
						toHour: '17',
						toMinute: '00'
					},
					theme: 'light',
					noRange: false,
					format: 24,
					noValidation: false
				};

				$scope.active = true;
				var myCurrentKitchenId = $stateParams.myCurrentKitchenId;

				$scope.toggleBusinessHour = function () {
					console.log('toggled to ' + $scope.active);

					KitchenAPI.toggleBusinessHour(myCurrentKitchenId, $scope.day, $scope.active).then(function (response) {
						devHelper.log(response);
						devHelper.log('toggled business hours');
					}, function (response) {
						genericService.showToast('Oops..! Something is wrong');
						devHelper.log(response, 'error');
					});
				};

				$scope.onApplyTimePicker = function (time) {
					var open = time.fromHour + time.fromMinute;
					var close = time.toHour + time.toMinute;

					console.log('Time range applied.');
					devHelper.log(time);
					console.log('Day: ' + $scope.day);
					console.log('Opening: ' + open);
					console.log('Closing: ' + close);

					KitchenAPI.updateBusinessHour(myCurrentKitchenId, $scope.day, open, close).then(function (response) {
						devHelper.log(response);
						devHelper.log('updated business hours');
					}, function (response) {
						genericService.showToast('Oops..! Something is wrong');
						devHelper.log(response, 'error');
					});
				};
				$scope.onClearTimePicker = function () {
					console.log('Time range current operation cancelled.');
				};
			}

		}
	});
'use strict';

angular.module('businessHour', [
])

	.directive('businessHour', function () {
		return {
			scope: {
				day: "@",
				label: "@",
				active: "@", //import referenced model to our directives scope
				open: "@",
				close: "@"
			},
			templateUrl: 'shared/businessHour/businessHourDirective.html',
			controller: function ($rootScope, $scope, $state, devHelper, genericService) {
				// Set initial time range to be 09:30 - 17:00
				$scope.settings = {
					dropdownToggleState: false,
					time: {
						fromHour: '09',
						fromMinute: '00',
						toHour: '17',
						toMinute: '30'
					},
					theme: 'light',
					noRange: false,
					format: 24,
					noValidation: false
				};

				$scope.active = true;

				$scope.onApplyTimePicker = function (time) {
					$scope.open = time.fromHour + time.fromMinute;
					$scope.close = time.toHour + time.toMinute;

					console.log('Time range applied.');
					devHelper.log(time);
					console.log('Opening: ' + $scope.open);
					console.log('Closing: ' + $scope.close);
				};
				$scope.onClearTimePicker = function () {
					console.log('Time range current operation cancelled.');
				};
			}

		}
	});
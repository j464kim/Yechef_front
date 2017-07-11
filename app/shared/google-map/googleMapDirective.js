'use strict';

angular.module('googleMapShow', [])
	.directive('googleMapShow', [function () {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'shared/google-map/googleMapDirective.html',
			scope: {
				for: '@',
				address: '@'
			},
			controller: ['$scope', 'MapAPI', 'devHelper', function ($scope, MapAPI, devHelper) {
				var address = $scope.address;
				devHelper.log($scope.for);
				devHelper.log($scope.address);
				$scope.map = MapAPI.getMapOption();
				$scope.map.options.gestureHandling = 'none';
				$scope.map.zoom = 20;
				$scope.mapCtrl = {};
				$scope.marker = {id: 0};

				function _init() {
					_locateKitchen(address);
				}

				function _locateKitchen(address) {
					MapAPI.geocode(address).then(function (result) {
							if (result) {
								devHelper.log(result);
								$scope.map.center.latitude = result[0].geometry.location.lat();
								$scope.map.center.longitude = result[0].geometry.location.lng();
								$scope.marker.coords = {
									latitude: result[0].geometry.location.lat(),
									longitude: result[0].geometry.location.lng()
								};
								$scope.mapCtrl.refresh();
							}
						}
					);
				}

				$scope.init = _init;
			}]
		}
	}
	]);
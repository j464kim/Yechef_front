'use strict';

angular.module('googleMapDirectives', [])
	.directive('googleMapShow', [function () {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'shared/google-map/googleMapShowDirective.html',
			scope: {
				for: '@',
				address: '@',
				lat: '@',
				lng: '@'
			},
			controller: ['$scope', 'MapAPI', 'devHelper', function ($scope, MapAPI, devHelper) {
				var address = $scope.address;
				devHelper.log($scope.for);
				devHelper.log($scope.address);
				$scope.map = MapAPI.getMapOption();
				$scope.map.options.gestureHandling = 'none';
				$scope.map.zoom = 15;
				$scope.mapCtrl = {};
				$scope.marker = {id: 0};

				function _init() {
					_locateKitchen(address);
				}

				function _locateKitchen(address) {
					if ($scope.lat && $scope.lng) {
						_setMap($scope.lat, $scope.lng);
					} else {
						MapAPI.geocode(address).then(function (result) {
								if (result) {
									devHelper.log(result);
									_setMap(result[0].geometry.location.lat(), result[0].geometry.location.lng());
								}
							}
						);
					}
				}

				function _setMap(lat, lng) {
					$scope.map.center.latitude = lat;
					$scope.map.center.longitude = lng;
					$scope.marker.coords = {
						latitude: lat,
						longitude: lng
					};
				}

				$scope.init = _init;
			}]
		}
	}
	])

	.directive('googleMapSearch', [function () {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'shared/google-map/googleMapSearchDirective.html',
			scope: {
				map: '=',
				mapEvents: '=',
				mapCtrl: '=',
				window: '=',
				markers: '=',
				markersEvents: '=',
				markersControl: '=',
				circle: '=',
				clusterEvents: '=',
				clusterOptions: '=',
				dishes: '=',
			},
			controller: ['$scope', 'MapAPI', 'devHelper', function ($scope, MapAPI, devHelper) {
			}]
		}
	}]);
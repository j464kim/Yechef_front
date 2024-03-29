'use strict';

angular.module('googleMapShowDirective', [])
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
			controller: ['$scope', 'MapAPI', 'devHelper', 'uiGmapIsReady', 'mapService',
				function ($scope, MapAPI, devHelper, uiGmapIsReady, mapService) {
					var address = $scope.address;
					devHelper.log($scope.for);
					devHelper.log($scope.address);
					$scope.map = mapService.getMapOption();
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
						uiGmapIsReady.promise().then((function (maps) {
							$scope.mapCtrl.refresh();
						}));
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
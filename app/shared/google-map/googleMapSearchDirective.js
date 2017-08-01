'use strict';

angular.module('googleMapSearchDirective', [])
	.directive('googleMapSearch', [function () {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'shared/google-map/googleMapSearchDirective.html',
			scope: {
				markers: '=',
				circle: '=',
				dishes: '=',
				searchEnabled: '=',
				searchFunction: '=',
				searchBoundsChanged: '=',
			},
			controller: ['$scope', 'MapAPI', 'devHelper', '$stateParams', 'uiGmapGoogleMapApi', '$rootScope', '$state', 'mapService',
				function ($scope, MapAPI, devHelper, $stateParams, uiGmapGoogleMapApi, $rootScope, $state, mapService) {
					$scope.windowStyled = false;
					$scope.initiated = false;
					$scope.mouseEventsEnabled = true;

					function _init() {
						$scope.map = mapService.getMapOption();
						$scope.window = mapService.getWindow();
						$scope.clusterOptions = mapService.getClusterOption();
						$scope.map.center.latitude = $stateParams.lat;
						$scope.map.center.longitude = $stateParams.lng;
						$scope.mapCtrl = {};

						_setEvents();
						_registerListeners();

						$scope.initiated = true;
					}

					function _setEvents() {
						$scope.mapEvents = {
							//This turns of events and hits against scope from gMap events this does speed things up
							// adding a blacklist for watching your controller scope should even be better
							//        blacklist: ['drag', 'dragend','dragstart','zoom_changed', 'center_changed'],
							idle: function (map, eventName, originalEventArgs) {

								var lat = $scope.mapCtrl.getGMap().getCenter().lat();
								var lng = $scope.mapCtrl.getGMap().getCenter().lng();
								var ne_lat = map.getBounds().getNorthEast().lat();
								var sw_lat = map.getBounds().getSouthWest().lat();
								var ne_lng = map.getBounds().getNorthEast().lng();
								var sw_lng = map.getBounds().getSouthWest().lng();

								if (_isMapSearchEnabled(ne_lat, ne_lng)) {
									$scope.searchBoundsChanged(ne_lat, ne_lng, sw_lat, sw_lng);
									$scope.searchFunction(true);
								}

								$state.go('.', {
									lat: lat,
									lng: lng,
									ne_lat: ne_lat,
									sw_lat: sw_lat,
									ne_lng: ne_lng,
									sw_lng: sw_lng
								}, {notify: false});
								$scope.mapCtrl.refresh();
							},
							click: function (map, eventName, originalEventArgs) {
								$scope.mouseEventsEnabled = true;
								_hideWindow();
								$scope.searchEnabled = true;
							},
						};

						$scope.markersEvents = {
							click: function (marker, eventName, model) {
								$scope.mouseEventsEnabled = false;
								$scope.searchEnabled = false;
								$scope.window.model = model;
								var dish = _findDishById(model.id);
								$scope.window.templateParameter = {
									dish: dish,
									style: 'complex',
								};
								_showWindow();
							}
						};

						$scope.clusterEvents = {
							click: function (cluster, models) {
								var allSameAddress = true;
								for (var i = 0; i < models.length - 1; i++) {
									if (models[i].latitude != models[i + 1].latitude || models[i].longitude != models[i + 1].longitude) {
										allSameAddress = false;
										_zoomIn();
										$scope.mapCtrl.getGMap().setCenter({
											lat: Number(models[i].latitude),
											lng: Number(models[i].longitude)
										});
										break;
									}
								}
								devHelper.log(cluster);
								devHelper.log(models);
								if (cluster.map_.zoom === cluster.map_.maxZoom || allSameAddress) {
									$scope.mouseEventsEnabled = false;
									var dishes = [];
									for (var i in models) {
										dishes.push(_findDishById(models[i].id));
									}
									$scope.window.model = models[0];
									$scope.window.templateParameter = {
										style: 'cluster',
										dishes: dishes
									};
									_showWindow();
								}
							}
						};
					}

					function _registerListeners() {
						$rootScope.$on('search:dishListMouseEnter', function (event, dish) {
							if ($scope.mouseEventsEnabled) {
								var marker = _findDishMarker(dish);
								$scope.searchEnabled = false;
								marker.options.zIndex = 86; // Maximum latitude in gmap is 85.
								marker.options.icon = 'images/google_map_icon_active.png';
								$scope.window.templateParameter = {
									dish: dish,
									style: 'simple',
								};
								$scope.window.model = marker;
								_showWindow();
							}
						});
						$rootScope.$on('search:dishListMouseLeave', function (event, dish) {
							if ($scope.mouseEventsEnabled) {
								var marker = _findDishMarker(dish);
								$scope.searchEnabled = true;
								marker.options.zIndex = Number(marker.latitude);
								marker.options.icon = 'images/google_map_icon.png';
								// $scope.window.show = false;
								_hideWindow();
							}
						});
					}

					function _hideWindow() {
						$scope.window.ctrl.hideWindow();
						$scope.window.show = false;
					}

					// Update the map search result if the map's center is moved enough
					function _isMapSearchEnabled(newNELat, newNELng) {
						if (!$scope.searchEnabled) {
							return false;
						}
						if (!$scope.oldNELat && !$scope.oldNELng) {
							$scope.oldNELat = newNELat;
							$scope.oldNELng = newNELng;
							return true;
						} else if ($scope.oldNELat && $scope.oldNELng) {
							var latDiff = Math.abs(newNELat - $scope.oldNELat);
							var lngDiff = Math.abs(newNELng - $scope.oldNELng);
							if (latDiff > 0.007 || lngDiff > 0.007) {
								// devHelper.log('User moved the map enough distance to refresh search');
								$scope.oldNELat = newNELat;
								$scope.oldNELng = newNELng;
								return true;
							} else {
								// devHelper.log('Map not moved enough distance to refresh search');
								return false;
							}
						} else {
							devHelper.log('Something is wrong with setting up boundary values in GMaps', 'error');
							return false;
						}
					}

					function _showWindow() {
						$scope.window.ctrl.showWindow();
						$scope.window.show = true;
						_styleWindow();
					}

					function _styleWindow() {
						if (!$scope.windowStyled) {
							uiGmapGoogleMapApi.then(
								function (maps) {
									var windows = $scope.window.ctrl.getGWindows();
									maps.event.addListener(windows[0], 'domready', function () {
										//Remove ugly default window background
										var iwOuter = $('.gm-style-iw');
										/* The DIV we want to change is above the .gm-style-iw DIV.
										 * So, we use jQuery and create a iwBackground variable,
										 * and took advantage of the existing reference to .gm-style-iw for the previous DIV with .prev().
										 */
										var iwBackground = iwOuter.prev();
										// Remove the background shadow DIV
										iwBackground.children(':nth-child(2)').css({'display': 'none'});
										// Remove the white background DIV
										iwBackground.children(':nth-child(4)').css({'display': 'none'});
										$scope.windowStyled = true;
									});
								}
							);
						}
					}

					function _zoomIn() {
						if ($scope.map.zoom < $scope.map.options.maxZoom) {
							$scope.mapCtrl.getGMap().setZoom($scope.map.zoom + 1);
						}
					}

					function _findDishMarker(dish) {
						for (var i in $scope.markers) {
							if ($scope.markers[i].id === dish.id) {
								return $scope.markers[i];
							}
						}
						devHelper.log('No marker found with id: ' + dish.id, 'error');
					}

					function _findDishById(id) {
						for (var i in $scope.dishes) {
							if ($scope.dishes[i].id === id) {
								return $scope.dishes[i];
							}
						}
						devHelper.log('No Dish found with id: ' + id, 'error');
					}

					_init();
				}]
		}
	}]);
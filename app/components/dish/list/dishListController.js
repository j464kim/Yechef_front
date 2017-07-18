'use strict';

angular.module('dish.list', [
	'dishes.api',
	'ngMaterial',
	'googleMapDirectives'
])

	.controller('DishListController', ['$state', 'DishesAPI', 'devHelper', 'SearchAPI', '$stateParams', 'MapAPI', 'genericService',
		function ($state, DishesAPI, devHelper, SearchAPI, $stateParams, MapAPI, genericService) {

			/*********************
			 *    Private Variables
			 **********************/
				// reference to this controller
			var that = this;

			/*********************
			 *    Public Variables
			 **********************/
			this.totalItems = 0;
			this.currentPage = 0;
			this.dishes = [];
			this.isSearchCollapsed = true;
			this.options = {};
			this.mapCtrl = {};
			this.dishMapMarkers = [];
			this.dishMapMarkerControl = {};
			this.mapInited = false;

			/*********************
			 *    Private Functions
			 **********************/

			function _init() {
				_initSearchOptions();
				_initGmap();
			}

			function _initSearchOptions() {
				that.options.q = $stateParams.q;
				that.options.nationality = $stateParams.nationality;
				that.options.vegan = $stateParams.vegan;
				that.options.vegetarian = $stateParams.vegetarian;
				that.options.gluten_free = $stateParams.gluten_free;
				that.options.min_price = $stateParams.min_price;
				that.options.max_price = $stateParams.max_price;
				that.options.sortBy = $stateParams.sortBy;
				that.options.city = $stateParams.city;
				that.options.distance = Number($stateParams.distance);
			}

			function _getDishes() {
				that.options.page = that.currentPage || that.currentPage++;
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(
						function (position) {
							that.options.userLat = position.coords.latitude;
							that.options.userLng = position.coords.longitude;
							that.circle.center.latitude = position.coords.latitude;
							that.circle.center.longitude = position.coords.longitude;
							_searchDish();
						}, function(error) {
							switch(error.code) {
								case error.PERMISSION_DENIED:
									devHelper.log("User denied the request for Geolocation.", 'error');
									break;
								case error.POSITION_UNAVAILABLE:
									devHelper.log("Location information is unavailable.", 'error');
									break;
								case error.TIMEOUT:
									devHelper.log("The request to get user location timed out.", 'error');
									break;
								case error.UNKNOWN_ERROR:
									devHelper.log("An unknown error occurred.", 'error');
									break;
							}
							_searchDish();
						});
				}
				else {
					devHelper.log("navigator.geolocation is not available", 'error');
					_searchDish();
				}
			}

			function _searchDish() {
				SearchAPI.dish(that.options).then(function (response) {
					devHelper.log(response);
					that.dishes = response.data;
					that.totalItems = response.total;
					that.currentPage = response.current_page;
					_locateDishes();
				}, function (response) {
					// TODO handle error state
					devHelper.log(response, 'error');
					genericService.showToast(response.data.message);
				});
			}

			function _initGmap() {
				that.map = MapAPI.getMapOption();
				that.circle = MapAPI.getCircle();
				that.window = MapAPI.getWindow();

				that.markersEvents = {
					click: function (marker, eventName, model) {
						that.window.model = model;
						var dish = _findDishById(model.id);
						that.window.options.content = dish.name + "<br/>" + dish.price;
						that.window.show = true;
					}
				};

				that.mapEvents = {
					//This turns of events and hits against scope from gMap events this does speed things up
					// adding a blacklist for watching your controller scope should even be better
					//        blacklist: ['drag', 'dragend','dragstart','zoom_changed', 'center_changed'],
					idle: function (map, eventName, originalEventArgs) {
						that.options.NE_lat = map.getBounds().getNorthEast().lat();
						that.options.SW_lat = map.getBounds().getSouthWest().lat();
						that.options.NE_lng = map.getBounds().getNorthEast().lng();
						that.options.SW_lng = map.getBounds().getSouthWest().lng();
						_getDishes();
						that.mapCtrl.refresh();
					},
					click: function (map, eventName, originalEventArgs) {
						var windows = that.window.ctrl.getChildWindows();
						for (var i = 0; i < windows.length; i++) {
							windows[i].hideWindow()
						}
					}
				};

				MapAPI.geocode($stateParams.city).then(function (result) {
						if (result) {
							that.map.center.latitude = result[0].geometry.location.lat();
							that.map.center.longitude = result[0].geometry.location.lng();
							that.map.zoom = 14;
							that.options.userLat = result[0].geometry.location.lat();
							that.options.userLng = result[0].geometry.location.lng();
							that.mapCtrl.refresh({
								latitude: that.map.center.latitude,
								longitude: that.map.center.longitude
							});
						}
					}
				);
				that.mapInited = true;
			}

			function _locateDishes() {
				//clear the array
				that.dishMapMarkers.splice(0, that.dishMapMarkers.length);
				Object.keys(that.dishes).forEach(function (dish) {
					var ret = {
						latitude: that.dishes[dish].lat,
						longitude: that.dishes[dish].lng,
						options: {
							title: that.dishes[dish].name,
							zIndex: that.dishes[dish].lat,
							icon: 'images/google_map_icon.png',
						},
					};
					ret["id"] = that.dishes[dish].id;
					that.dishMapMarkers.push(ret);
				});
			}

			function _findDishMarker(dish) {
				for (var i in that.dishMapMarkers) {
					if (that.dishMapMarkers[i].id === dish.id) {
						return that.dishMapMarkers[i];
					}
				}
				devHelper.log('No marker found with id: ' + dish.id, 'error');
			}

			function _findDishById(id) {
				for (var i in that.dishes) {
					if (that.dishes[i].id === id) {
						return that.dishes[i];
					}
				}
				devHelper.log('No Dish found with id: ' + id, 'error');
			}

			/*********************
			 *    Public Functions
			 **********************/
			this.getDishes = _getDishes;

			this.getSearchParams = function (sctrl) {
				sctrl.q = $stateParams.q;
				sctrl.selectedNationality = {};
				sctrl.selectedNationality.value = $stateParams.nationality ? $stateParams.nationality : 'all';
				sctrl.selectedNationality.display = $stateParams.nationality ? $stateParams.nationality : 'all';
				sctrl.vegan = $stateParams.vegan;
				sctrl.vegetarian = $stateParams.vegetarian;
				sctrl.gluten_free = $stateParams.gluten_free;
				sctrl.min_price = $stateParams.min_price;
				sctrl.max_price = $stateParams.max_price;
				sctrl.sortBy = $stateParams.sortBy;
				sctrl.distance = Number($stateParams.distance);
				sctrl.city = {formatted_address: $stateParams.city};
			};

			this.dishMouseEnter = function (dish) {
				var marker = _findDishMarker(dish);
				marker.options.zIndex = null;
				marker.options.icon = 'images/google_map_icon_active.png';
				that.window.options.content = '$ ' + dish.price;
				that.window.model = marker;
				that.window.show = true;
			};

			this.dishMouseLeave = function (dish) {
				var marker = _findDishMarker(dish);
				marker.options.zIndex = marker.latitude;
				marker.options.icon = 'images/google_map_icon.png';
				that.window.show = false;
			};

			/*********************
			 *    Initialization
			 **********************/
			_init();

			/*********************
			 *    EVENTS
			 **********************/
		}
	])
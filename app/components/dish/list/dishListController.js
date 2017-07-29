'use strict';

angular.module('dish.list', [
	'dishes.api',
	'ngMaterial',
	'googleMapDirectives'
])

	.controller('DishListController', ['$state', 'DishesAPI', 'devHelper', 'SearchAPI', '$stateParams', 'MapAPI', 'genericService', '$rootScope',
		function ($state, DishesAPI, devHelper, SearchAPI, $stateParams, MapAPI, genericService, $rootScope) {

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
			this.dishMapMarkers = [];
			this.mapInited = false;
			this.searchEnabled = true;

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
				that.options.ne_lat = $stateParams.ne_lat;
				that.options.sw_lat = $stateParams.sw_lat;
				that.options.ne_lng = $stateParams.ne_lng;
				that.options.sw_lng = $stateParams.sw_lng;
			}

			function _getDishes(reset) {
				that.options.page = reset ? 0 : that.currentPage;
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(
						function (position) {
							that.options.userLat = position.coords.latitude;
							that.options.userLng = position.coords.longitude;
							that.circle.center.latitude = position.coords.latitude;
							that.circle.center.longitude = position.coords.longitude;
							_searchDish();
						}, function (error) {
							switch (error.code) {
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
				that.circle = MapAPI.getCircle();

				that.mapInited = true;
			}

			function _locateDishes() {
				//clear the array
				that.dishMapMarkers.splice(0, that.dishMapMarkers.length);
				Object.keys(that.dishes).forEach(function (dish) {
					var ret = {
						latitude: that.dishes[dish].kitchen.lat,
						longitude: that.dishes[dish].kitchen.lng,
						options: {
							title: that.dishes[dish].name,
							zIndex: that.dishes[dish].kitchen.lat,
							icon: 'images/google_map_icon.png',
						},
					};
					ret["id"] = that.dishes[dish].id;
					that.dishMapMarkers.push(ret);
				});
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
				$rootScope.$broadcast('search:dishListMouseEnter', dish);
			};

			this.dishMouseLeave = function (dish) {
				$rootScope.$broadcast('search:dishListMouseLeave', dish);
			};

			this.searchBoundsChanged = function (ne_lat, ne_lng, sw_lat, sw_lng) {
				that.options.ne_lat = ne_lat;
				that.options.ne_lng = ne_lng;
				that.options.sw_lat = sw_lat;
				that.options.sw_lng = sw_lng;
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
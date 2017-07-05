'use strict';

angular.module('dish.list', [
	'dishes.api',
])

	.controller('DishListController', ['$state', 'DishesAPI', 'devHelper', 'SearchAPI', '$stateParams', 'MapAPI',
		function ($state, DishesAPI, devHelper, SearchAPI, $stateParams, MapAPI) {

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

			this.map = {
				center: {latitude: 0, longitude: 0},
				zoom: 10
			};

			this.map.options = {
				scrollwheel: false,
				disableDefaultUI: true,
				zoomControl: true,
				minZoom: 5,
				maxZoom: 15,
				noClear: false,
			};

			this.map.options.zoomControlOptions = {
				position: google.maps.ControlPosition.TOP_RIGHT,
			};


			this.mapEvents = {
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
			};

			/*********************
			 *    Private Functions
			 **********************/

			function _init() {
				_initSearchOptions();
				console.log($stateParams.city);
				MapAPI.geocode($stateParams.city).then(function (result) {
					that.map.center.latitude = result[0].geometry.location.lat();
					that.map.center.longitude = result[0].geometry.location.lng();
					that.mapCtrl.refresh();
				});
			}

			function _initSearchOptions() {
				that.options.q = $stateParams.q;
				that.options.nationality = $stateParams.nationality;
				that.options.vegan = $stateParams.vegan;
				that.options.vegetarian = $stateParams.vegetarian;
				that.options.gluten_free = $stateParams.gluten_free;
				that.options.min_price = $stateParams.min_price;
				that.options.max_price = $stateParams.max_price;
				that.options.city = $stateParams.city;
			}

			function _getDishes() {

				that.options.page = that.currentPage || that.currentPage++;

				SearchAPI.dish(that.options).then(function (response) {
					devHelper.log(response);
					that.dishes = response.data;
					that.totalItems = response.total;
					that.currentPage = response.current_page;
					_locateDishes();
				}, function (response) {
					// TODO handle error state
					console.error(response);
				});
			}

			function _locateDishes() {
				Object.keys(that.dishes).forEach(function (dish) {
					MapAPI.geocode(that.dishes[dish].kitchen.address).then(
						function (result) {
							var ret = {
								latitude: result[0].geometry.location.lat(),
								longitude: result[0].geometry.location.lng(),
								title: 'm' + that.dishes[dish].id
							};
							ret["id"] = that.dishes[dish].id;
							that.dishMapMarkers.push(ret);
						}
					)
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
				sctrl.distance = $stateParams.distance;
				sctrl.city = $stateParams.city;
			}


			/*********************
			 *    Initialization
			 **********************/
			_init();

			/*********************
			 *    EVENTS
			 **********************/
		}
	])
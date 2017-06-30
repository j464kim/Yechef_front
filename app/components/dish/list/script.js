'use strict';

angular.module('dish.list', [
	'dishes.api',
])

	.controller('DishListController', ['$state', 'DishesAPI', 'devHelper', 'uiGmapGoogleMapApi', 'SearchAPI', '$stateParams',
		function ($state, DishesAPI, devHelper, uiGmapGoogleMapApi, SearchAPI, $stateParams) {

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

			this.map = {
				center: {latitude: 45, longitude: -73},
				zoom: 13
			};
			this.map.options = {
				scrollwheel: false,
				disableDefaultUI: true,
				zoomControl: true,
			};

			/*********************
			 *    Private Functions
			 **********************/

			function _init() {
				_initSearchOptions();
				_getDishes();
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
					devHelper.log(that.totalItems);
					devHelper.log(that.currentPage);
				}, function (response) {
					// TODO handle error state
					console.error(response);
				});
			}

			/*********************
			 *    Public Functions
			 **********************/
			this.getDishes = _getDishes;
			this.getSearchParams = function(sctrl) {
				sctrl.q = $stateParams.q;
				sctrl.selectedNationality = {};
				sctrl.selectedNationality.value = $stateParams.nationality? $stateParams.nationality : 'all';
				sctrl.selectedNationality.display = $stateParams.nationality? $stateParams.nationality : 'all';
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
			uiGmapGoogleMapApi.then(function (maps) {
				// write your code here
				// (google is defined)
				devHelper.log(maps);
				that.map.options.zoomControlOptions = {
					position: google.maps.ControlPosition.TOP_RIGHT,
				};
			});
		}
	])
'use strict';

angular.module('dish.list', [
	'dishes.api',
	'directive.loader'
])

.controller('DishListController', ['$state', 'DishesAPI',
	function($state, DishesAPI){

		/*********************
		*	Private Variables
		**********************/
		// reference to this controller
		var that = this;

		/*********************
		*	Public Variables
		**********************/
		this.totalItems = 0;
		this.currentPage = 0;

		/*********************
		*	Private Functions
		**********************/

		function _init() {	
			_getDishes();
		}

		function _getDishes() {
			var pageNum = that.currentPage || that.currentPage++;

			DishesAPI.list(pageNum).then(function(response){
				console.log(response);
				that.dishes = response.data;
				that.totalItems = response.total;
				that.currentPage = response.current_page;
			}, function(response) {
				// TODO handle error state
				console.error(response);
			});
		}

		/*********************
		*	Public Functions
		**********************/
		this.getDishes = _getDishes;


		/*********************
		*	Initialization
		**********************/
		_init();

		/*********************
		*	EVENTS
		**********************/


		
	}
])
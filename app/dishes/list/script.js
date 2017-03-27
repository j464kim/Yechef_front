'use strict';

angular.module('dish.list', [
	'dishes.api',
	'angular-carousel'
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
		this.state = 'home';
		

		/*********************
		*	Private Functions
		**********************/

		function _init() {	
			_getDishes();
		}

		function _getDishes(pageNum) {
			DishesAPI.list(pageNum).then(function(response){
				console.log(response);
				that.dishes = response.data;
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
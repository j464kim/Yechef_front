'use strict';

angular.module('dish.list', [])

.controller('DishListController', ['$state',
	function($state){

		/*********************
		*	Private Variables
		**********************/

		/*********************
		*	Public Variables
		**********************/
		this.state = 'home';
		

		/*********************
		*	Private Functions
		**********************/

		function _init() {	

		}

		function _test() {

		}

		/*********************
		*	Public Functions
		**********************/
		this.test = _test;


		/*********************
		*	Initialization
		**********************/
		_init();

		/*********************
		*	EVENTS
		**********************/


		
	}
])
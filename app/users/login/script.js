'use strict';

angular.module('user.login', [
	'user.api'
])

.controller('UserLoginController', ['$state', 'UserAPI',
	function($state, UserAPI){

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
		}

		function _login() {
			UserAPI.login().then(function(response) {
				console.log(response);
			}, function(response) {
				console.error(response);
			});
		}
		/*********************
		*	Public Functions
		**********************/
		this.login = _login;


		/*********************
		*	Initialization
		**********************/
		_init();

		/*********************
		*	EVENTS
		**********************/


		
	}
])
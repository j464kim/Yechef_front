'use strict';

angular.module('user.login', [
	'user.api',
	'satellizer'
])

.config(function($authProvider) {

    $authProvider.facebook({
      clientId: '789389204557240'
    });
})

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
		/*********************
		*	Private Functions
		**********************/

		function _init() {	
		}

		function _socialLogin() {
			console.log("12312");
		}
		/*********************
		*	Public Functions
		**********************/
		this.socialLogin = _socialLogin;


		/*********************
		*	Initialization
		**********************/
		_init();

		/*********************
		*	EVENTS
		**********************/


		
	}
]);
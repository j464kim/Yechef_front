'use strict';

angular.module('user.login', [
	'user.api',
	'satellizer',
	'configuration'
])

.config(function($authProvider, config) {

    $authProvider.google({
      clientId: config.googleAppId,
      url: config.endpoint + 'auth/google',
    });

    $authProvider.facebook({
      clientId: config.facebookAppId,
      url: config.endpoint + 'auth/facebook',
    });
})

.controller('UserLoginController', ['$state', 'UserAPI', '$auth',
	function($state, UserAPI, $auth){

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

		function _socialLogin(provider) {
			$auth.authenticate(provider).then(
				function(response) {
					console.log(response);
				},
				function(response) {
					console.error(response);
				}
			);
		}

		function _exchangeAccessToken() {

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
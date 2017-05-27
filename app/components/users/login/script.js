'use strict';

angular.module('user.login', [
	'user.api',
	'configuration'
])


.controller('UserLoginController', ['$state', 'AuthAPI',
	function($state, AuthAPI){

		/*********************
		*	Private Variables
		**********************/
		// reference to this controller
		var that = this;

		/*********************
		*	Public Variables
		**********************/
		this.email = '';
		this.password = '';

		/*********************
		*	Private Functions
		**********************/

		function _init() {	
		}

		function _login() {
			AuthAPI.login(
				this.email,
				this.password
			).then(
				function(response) {
					//set access token
					console.log(response);
                    $state.go('home');
                },
				function(response) {
					console.error(response);
				}
			);
		}

		function _socialLogin(provider) {
			AuthAPI.socialLogin(
				provider
			).then(
				function(response) {
					console.log(response);
                    $state.go('home');
                },
				function(response) {
					console.error(response);
				}
			);
		}

		function _logout() {
			AuthAPI.logout().then(
				function(response) {
					console.log(response);
					$state.go('home');
				},
				function(response) {
					console.error(response);
				}
			);
		}

		/*********************
		*	Public Functions
		**********************/
		this.login = _login;
		this.socialLogin = _socialLogin;
		this.logout = _logout;

		/*********************
		*	Initialization
		**********************/
		_init();

		/*********************
		*	EVENTS
		**********************/

	}
]);
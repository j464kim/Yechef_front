'use strict';

angular.module('user.login', [
	'user.api',
	'configuration',
	'LocalStorageModule'
])


.controller('UserLoginController', ['$state', 'UserAPI', 'localStorageService',
	function($state, UserAPI, localStorageService){

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
			UserAPI.login(
				this.email,
				this.password
			).then(
				function(response) {
					//set access token
					localStorageService.set('access_token', response.access_token);
					localStorageService.set('refresh_token', response.refresh_token);
					localStorageService.set('expires_in', response.expires_in);
					console.log(response);
				},
				function(response) {
					console.error(response);
				}
			);
		}

		function _socialLogin(provider) {
			UserAPI.socialLogin(
				provider
			).then(
				function(response) {
					//set access token
					localStorageService.set('access_token', response.access_token);
					localStorageService.set('refresh_token', response.refresh_token);
					localStorageService.set('expires_in', response.expires_in);
					console.log(response);
				},
				function(response) {
					console.error(response);
				}
			);
		}

		function _logout() {
			UserAPI.logout().then(
				function(response) {
					//remove access token
					localStorageService.remove('access_token');
					localStorageService.remove('refresh_token');
					localStorageService.remove('expires_in');
					console.log(response);
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
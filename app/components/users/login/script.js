'use strict';

angular.module('user.login', [
	'user.api',
	'configuration'
])


	.controller('UserLoginController', ['$state', 'AuthAPI', 'devHelper', 'genericService',
		function ($state, AuthAPI, devHelper, genericService) {

			/*********************
			 *    Private Variables
			 **********************/
				// reference to this controller
			var that = this;

			/*********************
			 *    Public Variables
			 **********************/
			this.email = '';
			this.password = '';

			/*********************
			 *    Private Functions
			 **********************/

			function _init() {
			}

			function _login() {
				AuthAPI.login(
					this.email,
					this.password
				).then(
					function (response) {
						AuthAPI.setCurrentUser().then(
							function (currentUser) {
								devHelper.log(currentUser);
								$state.go('home');
							},
							function (error) {
								console.error(error);
							}
						);
						//set access token
						devHelper.log(response);
					},
					function (response) {
						genericService.showToast(response.data.message);
						console.error(response);
					}
				);
			}

			function _socialLogin(provider) {
				AuthAPI.socialLogin(
					provider
				).then(
					function (response) {
						AuthAPI.setCurrentUser().then(
							function (currentUser) {
								devHelper.log(currentUser);
								$state.go('home');
							},
							function (error) {
								console.error(error);
							}
						);
						;
						devHelper.log(response);
					},
					function (response) {
						genericService.showToast(response);
						console.error(response);
					}
				);
			}

			function _logout() {
				AuthAPI.logout().then(
					function (response) {
						devHelper.log(response);
						$state.go('home');
					},
					function (response) {
						console.error(response);
					}
				);
			}

			/*********************
			 *    Public Functions
			 **********************/
			this.login = _login;
			this.socialLogin = _socialLogin;
			this.logout = _logout;

			/*********************
			 *    Initialization
			 **********************/
			_init();

			/*********************
			 *    EVENTS
			 **********************/

		}
	]);
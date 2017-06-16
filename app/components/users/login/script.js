'use strict';

angular.module('user.login', [
	'user.api',
	'configuration'
])


	.controller('UserLoginController', ['$state', 'AuthAPI', 'devHelper', '$mdToast',
		function ($state, AuthAPI, devHelper, $mdToast) {

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
						$mdToast.show(
							$mdToast.simple()
								.textContent(response.data.message)
								.position('top center')
								.highlightClass('md-warn')
								.capsule(true)
								.hideDelay(3000)
						);
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
						$mdToast.show(
							$mdToast.simple()
								.textContent(response)
								.position('top center')
								.highlightClass('md-warn')
								.capsule(true)
								.hideDelay(3000)
						);
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
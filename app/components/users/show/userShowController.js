'use strict';

angular.module('user.show', [
	'ngMaterial',
	'user.api'
])


	.controller('UserShowController', ['$state', '$stateParams', 'UserAPI', 'devHelper', 'genericService',
		function ($state, $stateParams, UserAPI, devHelper, genericService) {

			/*********************
			 *    Private Variables
			 **********************/
				// reference to this controller
			var that = this;

			/*********************
			 *    Private Variables
			 **********************/
			this.userId = $stateParams.id;


			/*********************
			 *  Private Functions
			 **********************/

			function _init() {
				_showUser();
			}

			function _showUser() {
				UserAPI.show(that.userId).then(function (response) {
					that.user = response;
					devHelper.log(that.user);

					//TODO: user media to be ready soon
					// that.media = response.medias[0].url;

				}, function (response) {
					// TODO handle error state
					devHelper.log(response, 'error');
					genericService.showToast(response.data.message);
				});
			}

			/*********************
			 *  Public Functions
			 **********************/

			/*********************
			 *  Initialization
			 **********************/
			_init();


			/*********************
			 *  EVENTS
			 **********************/

		}
	]);
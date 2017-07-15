'use strict';

angular.module('user.show', [
	'ngMaterial',
	'user.api',
	'carousel',
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
				_showUser()
				_getKitchens();
				_getSubscriptions();
				_getForkedDishes();
			}

			function _showUser() {
				UserAPI.show(that.userId).then(function (response) {
					that.user = response;
					that.user.medias = [{id: 1, url: 'http://data.whicdn.com/images/61121884/large.gif'},
						{id: 2, url: 'http://vignette2.wikia.nocookie.net/onepiece/images/e/e6/Tony_Tony_Chopper_Anime_Pre_Timeskip_Infobox.png/revision/latest?cb=20160207143020'},
						{id: 3, url: 'http://www.wtfgamersonly.com/wp-content/uploads/2015/12/Tony-Tony-Chopper-cute-dance.gif'}];
					devHelper.log(that.user);
					that.user.joinedIn = new Date(that.user.created_at).toDateString().split(' ');

					//TODO: user media to be ready soon
					// that.media = response.medias[0].url;

				}, function (response) {
					// TODO handle error state
					devHelper.log(response, 'error');
					genericService.showToast(response.data.message);
				});
			}

			function _getKitchens(){
				UserAPI.getKitchens(that.userId).then(function (response) {
					that.kitchens = response;
					devHelper.log(that.kitchens);

					//TODO: user media to be ready soon
					// that.media = response.medias[0].url;

				}, function (response) {
					// TODO handle error state
					devHelper.log(response, 'error');
					genericService.showToast(response.data.message);
				});

			}

			function _getForkedDishes() {
				UserAPI.getForkedDishes(that.userId).then(function (response) {
					that.forkedDishes = response;
					devHelper.log(that.forkedDishes);

					//TODO: user media to be ready soon
					// that.media = response.medias[0].url;

				}, function (response) {
					// TODO handle error state
					devHelper.log(response, 'error');
					genericService.showToast(response.data.message);
				});

			}

			function _getSubscriptions() {
				UserAPI.getSubscriptions(that.userId).then(function (response) {
					that.subscriptions = response;
					devHelper.log(that.subscriptions);

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
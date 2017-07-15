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

			this.subscribedKitchensTotalItems = 0;
			this.subscribedKitchensCurrentPage = 0;
			this.subscribedKitchens = [];
			this.forkedDishesTotalItems = 0;
			this.forkedDishesCurrentPage = 0;
			this.forkedDishes = [];
			this.kitchensTotalItems = 0;
			this.kitchensCurrentPage = 0;
			this.kitchens = [];

			this.kitchensLoadButton = true;
			this.forkedDishesLoadButton = true;
			this.subscribedKitchensLoadButton = true;


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
						{
							id: 2,
							url: 'http://vignette2.wikia.nocookie.net/onepiece/images/e/e6/Tony_Tony_Chopper_Anime_Pre_Timeskip_Infobox.png/revision/latest?cb=20160207143020'
						},
						{
							id: 3,
							url: 'http://www.wtfgamersonly.com/wp-content/uploads/2015/12/Tony-Tony-Chopper-cute-dance.gif'
						}];
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

			function _getKitchens() {
				// var pageNum = that.kitchensCurrentPage || that.kitchensCurrentPage++;
				var pageNum = ++that.kitchensCurrentPage;
				UserAPI.getKitchens(that.userId, pageNum, 3).then(function (response) {
					that.kitchens = that.kitchens.concat(response.data);
					that.kitchensTotalItems = response.total;
					that.kitchensCurrentPage = response.current_page;
					if (response.last_page <= that.kitchensCurrentPage) {
						that.kitchensLoadButton = false;
					}
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
				var pageNum = ++that.forkedDishesCurrentPage;

				UserAPI.getForkedDishes(that.userId, pageNum, 4).then(function (response) {
					that.forkedDishes = that.forkedDishes.concat(response.data);
					that.forkedDishesTotalItems = response.total;
					that.forkedDishesCurrentPage = response.current_page;
					if (response.last_page <= that.forkedDishesCurrentPage) {
						that.forkedDishesLoadButton = false;
					}
					devHelper.log(that.forkedDishes);

					//TODO: user media to be ready soon
					// that.media = response.medias[0].url;

				}, function (response) {
					// TODO handle error state
					devHelper.log(response, 'error');
				});

			}

			function _getSubscriptions() {
				var pageNum = ++that.subscribedKitchensCurrentPage;

				UserAPI.getSubscriptions(that.userId, pageNum, 3).then(function (response) {
					that.subscribedKitchens = that.subscribedKitchens.concat(response.data);
					that.subscribedKitchensTotalItems = response.total;
					that.subscribedKitchensCurrentPage = response.current_page;
					if (response.last_page <= that.subscribedKitchensCurrentPage) {
						that.subscribedKitchensLoadButton = false;
					}
					devHelper.log(that.subscribedKitchens);

					//TODO: user media to be ready soon
					// that.media = response.medias[0].url;

				}, function (response) {
					// TODO handle error state
					devHelper.log(response, 'error');
				});

			}

			/*********************
			 *  Public Functions
			 **********************/
			this.getKitchens = _getKitchens;
			this.getForkedDishes = _getForkedDishes;
			this.getSubscriptions = _getSubscriptions;

			/*********************
			 *  Initialization
			 **********************/
			_init();

			/*********************
			 *  EVENTS
			 **********************/

		}
	]);
'use strict';

angular.module('rating', [
	'rating.api',
])
	.controller('RatingController', ['$state', '$stateParams', 'RatingAPI', '$q', 'devHelper', 'genericService',
		function ($state, $stateParams, RatingAPI, $q, devHelper, genericService) {
			/*********************
			 *    Private Variables
			 **********************/
				// reference to this controller
			var that = this;

			/*********************
			 *    Public Variables
			 **********************/
			this.totalItems = 0;
			this.currentPage = 0;
			this.lastPage = 0;
			this.ratings = [];
			this.avg = [];
			this.readonly = true;
			this.dishId = $stateParams.id;
			this.bestAvgName = '';
			this.loadButton = true;

			//Rating Inputs
			this.bestAvg = 0;

			/*********************
			 *    Private Functions
			 **********************/

			function _init() {
				_getAverage();
				_getRatings();
			}

			function _getRatings() {
				var pageNum = ++that.currentPage;

				RatingAPI.list(that.dishId, '', pageNum).then(
					function (response) {
						devHelper.log(response);
						that.ratings = that.ratings.concat(response.data);
						that.totalItems = response.total;
						that.currentPage = response.current_page;
						that.lastPage = response.last_page;
					}, function (response) {
						genericService.showToast('Oops..! Something is wrong');
						devHelper.log(response, 'error');
					});
			}

			function _getAverage() {
				RatingAPI.list(that.dishId, 'avg', 0).then(
					function (response) {
						devHelper.log(response);
						that.avg = response;
						that.bestAvg = that.avg.taste_rating;
						that.bestAvgName = 'Taste';
						if (that.bestAvg < that.avg.visual_rating) {
							that.bestAvg = that.avg.visual_rating;
							that.bestAvgName = 'Visual';
						}
						if (that.bestAvg < that.avg.quantity_rating) {
							that.bestAvg = that.avg.quantity_rating;
							that.bestAvgName = 'Quantity';
						}
						that.bestAvg = Number(that.bestAvg).toFixed(2);
						that.avg.taste_rating = Number(that.avg.taste_rating).toFixed(2);
						that.avg.visual_rating = Number(that.avg.visual_rating).toFixed(2);
						that.avg.quantity_rating = Number(that.avg.quantity_rating).toFixed(2);
					}, function (response) {
						devHelper.log(response, 'error');
					});
			}

			// /*********************
			//  *    Public Functions
			//  **********************/
			this.getRatings = _getRatings;
			this.getAvg = _getAverage;

			this.updateComment = function (rating, comment) {
				var defer = $q.defer();
				// Needed to restore old comment value in case the update fails
				var originalComment = rating.comment;
				rating.comment = comment;
				RatingAPI.update(that.dishId, rating.id, rating).then(
					function (response) {
						defer.resolve(true);
						devHelper.log(response);
					}, function (response) {
						rating.comment = originalComment;
						defer.resolve(false);
						devHelper.log(response, 'error');
					}
				);
				return defer.promise;
			};

			this.destroyRating = function ($ratingId) {
				if (confirm("Do you want to delete the dish?")) {
					RatingAPI.destroy(that.dishId, $ratingId).then(
						function (response) {
							$state.reload();
						}, function (response) {
							devHelper.log(response, 'error');
						}
					)
				}
			};

			/*********************
			 *    Initialization
			 **********************/
			_init();

			/*********************
			 *    EVENTS
			 **********************/
		}
	])
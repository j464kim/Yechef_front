'use strict';

angular.module('rating.service', [
	'configuration'
])

	.service('RatingService', ['$q', '$mdDialog',
		function ($q, $mdDialog) {

			function showRatingCreateDialog(ev, dishId, orderItemId) {
				$mdDialog.show({
					templateUrl: 'shared/rating/create/ratingCreateModal.html',
					parent: angular.element(document.body),
					targetEvent: ev,
					clickOutsideToClose: true,
					controller: function ($mdDialog) {
						var that = this;
						that.dishId = dishId;  //your task object from the ng-repeat
						that.orderItemId = orderItemId;

						that.hide = function () {
							$mdDialog.hide();
						};
						that.cancel = function () {
							$mdDialog.cancel();
						};
					},
					controllerAs: 'modalCtrl',
					fullscreen: true // Only for -xs, -sm breakpoints.
				})
			}

			function isReviewable (order, item) {
				var from = moment(order.updated_at);
				var now = moment();
				return order.status == 'accepted' && now.diff(from, 'hours') < 24 && !item.dish_rating;
			}

			return {
				showRatingCreateDialog: showRatingCreateDialog,
				isReviewable: isReviewable
			};
		}
	]);
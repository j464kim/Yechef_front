'use strict';

angular.module('rating.api', [
    'configuration'
])

    .factory('RatingResource', ['$resource', 'config',
        function ($resource, config) {
            var api_endpoint = config.endpoint + 'dishes/:dishId/rating/';

            return $resource(api_endpoint + ':ratingId', {dishId: '@dishId', ratingId: '@ratingId'}, {
                list: {
                    method: 'GET',
                },
                create: {
                    method: 'POST',
                },
                update: {
                    method: 'PUT',
                },
                destroy: {
                    method: 'DELETE',
                },
            });
        }
    ])

    .service('RatingAPI', ['$q', 'RatingResource', '$mdDialog',
        function ($q, RatingResource, $mdDialog) {

            function list(dishId, ratingId, pageNum) {
                pageNum = pageNum || 0;
                return $q(function (resolve, reject) {
                    RatingResource.list(
                        {
                            dishId: dishId,
                            ratingId: ratingId,
                            page: pageNum
                        }
                    ).$promise.then(function (response) {
                        resolve(response.body);
                    }, function (response) {
                        reject(response)
                    });
                });
            };

            function create(dishId, orderItemId, rating) {
                return $q(function (resolve, reject) {
                    RatingResource.create(rating,
                        {
                            dishId: dishId,
							orderItemId: orderItemId
                        })
                        .$promise.then(function (response) {
                        resolve(response.body);
                    }, function (response) {
                        reject(response)
                    });
                });
            };

            function update(dishId, ratingId, rating) {
                return $q(function (resolve, reject) {
                    RatingResource.update(rating,
                        {
                            dishId: dishId,
                            ratingId: ratingId,
                        }
                    ).$promise.then(function (response) {
                        resolve(response.body);
                    }, function (response) {
                        reject(response)
                    });
                });
            };

            function destroy(dishId, ratingId) {

                return $q(function (resolve, reject) {
                    RatingResource.destroy(
                        {
                            dishId: dishId,
                            ratingId: ratingId,
                        }
                    ).$promise.then(function (response) {
                        resolve(response.body);
                    }, function (response) {
                        reject(response)
                    });
                });
            };

            function showRatingCreateDialog(ev, dishId, orderItemId) {
				$mdDialog.show({
					templateUrl: 'shared/rating/create/ratingCreate.html',
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
					controllerAs: 'modal',
					fullscreen: true // Only for -xs, -sm breakpoints.
				})
			};

            return {
                list: list,
                create: create,
                update: update,
                destroy: destroy,
                showRatingCreateDialog: showRatingCreateDialog
            };
        }
    ]);
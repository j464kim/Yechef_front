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
                show: {
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

    .service('RatingAPI', ['$q', 'RatingResource',
        function ($q, RatingResource) {

            function list(dishId, ratingId, pageNum) {
                if (isNaN(pageNum)) {
                    return;
                }
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

            function show(dishId, ratingId) {

                return $q(function (resolve, reject) {
                    RatingResource.show(
                        {
                            dishId: dishId,
                            ratingId: ratingId
                        }
                    ).$promise.then(function (response) {
                        resolve(response.body);
                    }, function (response) {
                        reject(response)
                    });
                });
            };

            //TODO: Author
            function create(dishId, ratingId, taste_rating, visual_rating, quantity_rating, comment) {
                return $q(function (resolve, reject) {
                    RatingResource.create(
                        {
                            dishId: dishId,
                            ratingId: ratingId,
                            taste_rating: taste_rating,
                            visual_rating: visual_rating,
                            quantity_rating: quantity_rating,
                            comment: comment
                        }
                    ).$promise.then(function (response) {
                        resolve(response.body);
                    }, function (response) {
                        reject(response)
                    });
                });
            };

            function update(dishId, ratingId, taste_rating, visual_rating, quantity_rating, comment) {
                return $q(function (resolve, reject) {
                    RatingResource.update(
                        {
                            dishId: dishId,
                            ratingId: ratingId,
                            taste_rating: taste_rating,
                            visual_rating: visual_rating,
                            quantity_rating: quantity_rating,
                            comment: comment
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

            return {
                list: list,
                show: show,
                create: create,
                update: update,
                destroy: destroy,
            };
        }
    ]);
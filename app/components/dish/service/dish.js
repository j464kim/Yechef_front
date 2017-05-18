'use strict';

angular.module('dishes.api', [
    'configuration'
])

    .factory('DishesResource', ['$resource', 'config',
        function ($resource, config) {
            var api_endpoint = config.endpoint + 'dishes/';

            return $resource(api_endpoint + ':id', {id: '@id'}, {
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

    .service('DishesAPI', ['$q', 'DishesResource',
        function ($q, DishesResource) {

            function list(pageNum) {
                if (isNaN(pageNum)) {
                    return;
                }
                pageNum = pageNum || 0;

                return $q(function (resolve, reject) {
                    DishesResource.list(
                        {
                            page: pageNum
                        }
                    ).$promise.then(function (response) {
                        resolve(response.body);
                    }, function (response) {
                        reject(response)
                    });
                });
            };

            function show(dishId) {

                return $q(function (resolve, reject) {
                    DishesResource.show(
                        {
                            id: dishId
                        }
                    ).$promise.then(function (response) {
                        resolve(response.body);
                    }, function (response) {
                        reject(response)
                    });
                });
            };

            function create(name, description, price, kitchen_id) {
                return $q(function (resolve, reject) {
                    DishesResource.create(
                        {
                            name: name,
                            description: description,
                            price: price,
                            kitchen_id: kitchen_id,
                        }
                    ).$promise.then(function (response) {
                        resolve(response.body);
                    }, function (response) {
                        reject(response)
                    });
                });
            };

            function update(dishId, name, description, price, kitchen_id) {
                return $q(function (resolve, reject) {
                    DishesResource.update(
                        {
                            id: dishId,
                            name: name,
                            description: description,
                            price: price,
                            kitchen_id: kitchen_id,
                        }
                    ).$promise.then(function (response) {
                        resolve(response.body);
                    }, function (response) {
                        reject(response)
                    });
                });
            };

            function destroy(dishId) {

                return $q(function (resolve, reject) {
                    DishesResource.destroy(
                        {
                            id: dishId,
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
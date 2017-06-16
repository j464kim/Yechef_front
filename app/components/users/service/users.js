'use strict';

angular.module('user.api', [])

    .factory('UserResource', ['$resource', 'config',
        function ($resource, config) {
            var api_endpoint = config.endpoint + 'users/';

            return $resource(api_endpoint + ':id', {id: '@id'}, {
                list: {
                    method: 'GET'
                },
            });
        }
    ])

    .service('UserAPI', ['$q', 'UserResource',
        function ($q, UserResource) {

            function list(option) {

                return $q(function (resolve, reject) {
                    UserResource.list({
                        id: option,
                    }).$promise.then(function (response) {
                        resolve(response.body);
                    }, function (response) {
                        console.log(seconds, expireAt);
                        reject(response);
                    });
                });
            };

            return {
                list: list
            };
        }
    ]);

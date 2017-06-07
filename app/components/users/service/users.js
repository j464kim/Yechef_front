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

    .service('UserhAPI', ['$q', 'UserResource',
        function ($q, UserResource) {

            function list(email, password) {

                return $q(function (resolve, reject) {
                    UserhAPI.list().then(function (response) {
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
'use strict';

angular.module('kitchen.api', [
  'configuration'
])

  .factory('KitchenResource', ['$resource', 'config',
    function ($resource, config) {
      var apiEndpoint = config.endpoint + 'kitchens/';

      return $resource(apiEndpoint + ':id', {id: '@id'}, {
        list: {
          method: 'GET',
        }
      });
    }
  ])

  .service('KitchenAPI', ['$q', 'KitchenResource',
    function ($q, KitchenResource) {

      function list(pageNum) {
        pageNum = pageNum || 0;

        return $q(function (resolve, reject) {
          KitchenResource.list(
            {
              page: pageNum
            }
          ).$promise.then(function (response) {
            resolve(response.body);
          }, function (response) {
            reject(response);
          });
        });
      }


      return {
        list: list
      };
    }
  ]);

'use strict';

angular.module('dish.destroy', [
    'dishes.api',
])

    .controller('DishDestroyController', ['$state', '$stateParams', 'DishesAPI', '$scope',
        function ($state, $stateParams, DishesAPI, $scope) {

            /*********************
             *    Private Variables
             **********************/
                // reference to this controller
            var that = this;
            var dishId = $stateParams.id;

            /*********************
             *    Public Variables
             **********************/

            /*********************
             *    Private Functions
             **********************/

            /*********************
             *    Public Functions
             **********************/
            $scope.destroyDish = function _destroyDish() {
                DishesAPI.destroy(dishId).then(function (response) {
                    $state.go('dish.list');
                }, function (response) {
                    // TODO handle error state
                    console.error(response);
                });
            }

            /*********************
             *    Initialization
             **********************/

            /*********************
             *    EVENTS
             **********************/

        }
    ])
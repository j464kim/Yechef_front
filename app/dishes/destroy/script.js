'use strict';

angular.module('dish.destroy', [
    'dishes.api',
    'directive.loader'
])

    .controller('DishDestroyController', ['$stateParams', 'DishesAPI', '$scope',
        function ($stateParams, DishesAPI, $scope) {

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
                    console.log(response);
                    $scope.dish = response;
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
/**
 * Created by ghkdt on 2017-05-06.
 */

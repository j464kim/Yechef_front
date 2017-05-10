'use strict';

angular.module('dish.create', [
    'dishes.api',
])

    .controller('DishCreateController', ['$state', 'DishesAPI', '$scope',
        function ($state, DishesAPI, $scope) {

            /*********************
             *    Private Variables
             **********************/
                // reference to this controller
            var that = this;

            /*********************
             *    Public Variables
             **********************/

            /*********************
             *    Private Functions
             **********************/

            function _init() {
                //_createDish();
            }

            function _createDish() {
//                console.log($scope.slug + $scope.name + $scope.description);

                DishesAPI.create($scope.name, $scope.description).then(function (response) {
                    console.log(response);
                }, function (response) {
                    // TODO handle error state
                    console.error(response);
                });
            }

            /*********************
             *    Public Functions
             **********************/
            $scope.createDish = _createDish;
            $scope.reset = function reset() {
                $scope.name = '';
                $scope.description = '';
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
/**
 * Created by ghkdt on 2017-05-06.
 */

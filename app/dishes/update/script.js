'use strict';

angular.module('dish.update', [
    'dishes.api',
])

    .controller('DishUpdateController', ['$state', '$stateParams', 'DishesAPI', '$scope',
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

            function _init() {
                _showDish(dishId);
            }

            function _showDish() {
                DishesAPI.show(dishId)
                    .then(function (response) {
                        console.log(response);
                        $scope.dish = response;
                        $scope.name = $scope.dish.name;
                        $scope.description = $scope.dish.description;
                    }, function (response) {
                        // TODO handle error state
                        console.error(response);
                    });
            }

            /*********************
             *    Public Functions
             **********************/
            $scope.updateDish = function _updateDish() {
                DishesAPI.update($scope.dish.id, $scope.name, $scope.description)
                    .then(function (response) {
                        $state.go('dish.show', {"id": response.id});
                    }, function (response) {
                        //     TODO handle error state
                        console.error(response);
                    });
            }
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
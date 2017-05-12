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

            function _createDish() {
                DishesAPI.create($scope.name, $scope.description)
                    .then(function (response) {
                        $state.go('dish.show', {"id": response.id});
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
             *    EVENTS
             **********************/


        }
    ])
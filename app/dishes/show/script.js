'use strict';

angular.module('dish.show', [
    'dishes.api',
])

    .controller('DishShowController', ['$stateParams', 'DishesAPI', '$scope',
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
            this.dishId = $stateParams.id;

            /*********************
             *    Private Functions
             **********************/

            function _init() {
                _showDish();
            }

            function _showDish() {
                DishesAPI.show(dishId).then(function (response) {
                    console.log(response);
                    // that.dish = response;
                    $scope.dish = response;
                }, function (response) {
                    // TODO handle error state
                    console.error(response);
                });
            }

            /*********************
             *    Public Functions
             **********************/
            this.showDish = _showDish;

            /*********************
             *    Initialization
             **********************/
            _init();

            /*********************
             *    EVENTS
             **********************/


        }
    ])
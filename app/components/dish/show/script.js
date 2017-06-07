'use strict';

angular.module('dish.show', [
    'dishes.api',
])

    .controller('DishShowController', ['$state', '$stateParams', 'DishesAPI',
        function ($state, $stateParams, DishesAPI) {

            /*********************
             *    Private Variables
             **********************/
                // reference to this controller
            var that = this;

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
                DishesAPI.show(that.dishId)
                    .then(function (response) {
                        that.dish = response;
                    }, function (response) {
                        // TODO handle error state
                        console.error(response);
                    });

            }

            /*********************
             *    Initialization
             **********************/
            _init();

            /*********************
             *    EVENTS
             **********************/
        }
    ]);
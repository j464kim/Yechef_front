'use strict';

angular.module('dish.show', [
    'share',
    'carousel',
    'dishes.api',
])

    .controller('DishShowController', ['$state', '$stateParams', 'DishesAPI', 'KitchenAPI',
        function ($state, $stateParams, DishesAPI, KitchenAPI) {

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
                        _getKitchen(that.dish.kitchen_id);
                    }, function (response) {
                        // TODO handle error state
                        console.error(response);
                    });

            }

            function _getKitchen(kitchenId) {
                KitchenAPI.show(kitchenId).then(function (response) {
                    that.kitchen = response;
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
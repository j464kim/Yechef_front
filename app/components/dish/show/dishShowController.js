'use strict';

angular.module('dish.show', [
    'share',
    'carousel',
    'dishes.api',
])

    .controller('DishShowController', ['$state', '$stateParams', 'DishesAPI', 'KitchenAPI', 'devHelper',
        function ($state, $stateParams, DishesAPI, KitchenAPI, devHelper) {

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
						devHelper.log(response, 'error');
                    });

            }

            function _getKitchen(kitchenId) {
                KitchenAPI.show(kitchenId).then(function (response) {
                    that.kitchen = response;
                }, function (response) {
                    // TODO handle error state
					devHelper.log(response, 'error');
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
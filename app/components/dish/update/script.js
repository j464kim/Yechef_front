'use strict';

angular.module('dish.update', [
    'dishes.api',
])

    .controller('DishUpdateController', ['$state', '$stateParams', 'DishesAPI',
        function ($state, $stateParams, DishesAPI) {

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
                        that.dish = response;
                        that.name = response.name;
                        that.description = response.description;
                    }, function (response) {
                        // TODO handle error state
                        console.error(response);
                    });
            }

            function _updateDish() {
                DishesAPI.update(that.dish.id, that.name, that.description)
                    .then(function (response) {
                        $state.go('dish.show', {"id": response.id});
                    }, function (response) {
                        //     TODO handle error state
                        console.error(response);
                    });
            }

            /*********************
             *    Public Functions
             **********************/
            this.updateDish = _updateDish;
            this.cancel = function cancel() {
                if (confirm("Do you want to go back?")) {
                    $state.go('dish.show', {"id": dishId});
                }
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
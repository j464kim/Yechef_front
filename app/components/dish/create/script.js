'use strict';

angular.module('dish.create', [
    'dishes.api',
])

    .controller('DishCreateController', ['$state', 'DishesAPI',
        function ($state, DishesAPI) {

            /*********************
             *    Private Variables
             **********************/
                // reference to this controller
            var that = this;

            function _createDish() {
                //TODO: Add User permission so that only registered users can create dish
                DishesAPI.create(that.name, that.description, that.price, that.kitchen_id)
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
            this.createDish = _createDish;
            this.cancel = function cancel() {
                if (confirm("Do you want to go back?")) {
                    $state.go('dish.listInfinite');
                }
            };

            /*********************
             *    EVENTS
             **********************/


        }
    ])
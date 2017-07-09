'use strict';

angular.module('dish.list.feature', [
    'dishes.api',
])

    .controller('FeaturedDishController', ['$state', 'DishesAPI', 'devHelper',
        function ($state, DishesAPI, devHelper) {

            /*********************
             *    Private Variables
             **********************/
                // reference to this controller
            var that = this;

            /*********************
             *    Public Variables
             **********************/
            this.totalItems = 0;
            this.currentPage = 0;
            this.dishes = [];
            that.map = {center: {latitude: 45, longitude: -73}, zoom: 8};

            /*********************
             *    Private Functions
             **********************/

            function _init() {
                _getFeaturedDishes();
            }

            function _getFeaturedDishes() {
                var pageNum = that.currentPage || that.currentPage++;

                DishesAPI.list(pageNum).then(function (response) {
                    devHelper.log(response);
					that.dishes = response.data;
					that.totalItems = response.total;
					that.currentPage = response.current_page;
                }, function (response) {
                    // TODO handle error state
                    console.error(response);
                });
            }

            /*********************
             *    Public Functions
             **********************/
            this.getFeaturedDishes = _getFeaturedDishes;

            /*********************
             *    Initialization
             **********************/
            _init();

            /*********************
             *    EVENTS
             **********************/
        }
    ])
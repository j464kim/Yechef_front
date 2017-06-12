'use strict';

angular.module('dish.list.infinite', [
    'dishes.api',
])

    .controller('DishListInfiniteController', ['$state', 'DishesAPI', 'devHelper', 'uiGmapGoogleMapApi',
        function ($state, DishesAPI, devHelper, uiGmapGoogleMapApi) {

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
                _getDishes();
            }

            function _getDishes() {
                var pageNum = that.currentPage || that.currentPage++;

                DishesAPI.list(pageNum).then(function (response) {
                    devHelper.log(response);
                    that.dishes = that.dishes.concat(response.data);
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
            this.getDishes = _getDishes;

            /*********************
             *    Initialization
             **********************/
            _init();

            /*********************
             *    EVENTS
             **********************/
            uiGmapGoogleMapApi.then(function (maps) {
                // write your code here
                // (google is defined)
                console.log(maps);
            });

        }
    ])
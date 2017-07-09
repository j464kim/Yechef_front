'use strict';

angular.module('dish.list', [
    'dishes.api',
])

    .controller('DishListController', ['$state', 'DishesAPI', 'devHelper', 'uiGmapGoogleMapApi',
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
            this.isSearchCollapsed = true;

            this.map = {
                center: {latitude: 45, longitude: -73},
                zoom: 13
            };
            this.map.options = {
                scrollwheel: false,
                disableDefaultUI: true,
                zoomControl: true,
            };

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
                    that.dishes = response.data;
                    that.totalItems = response.total;
                    that.currentPage = response.current_page;
                    devHelper.log(that.totalItems);
                    devHelper.log(that.currentPage);
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
                devHelper.log(maps);
                that.map.options.zoomControlOptions = {
                    position: google.maps.ControlPosition.TOP_RIGHT,
                };
            });
        }
    ])
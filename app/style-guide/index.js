'use strict';

angular.module('style-guide', [
    'configuration',
    'smoothScroll'
])

.config(function ($stateProvider, config) {

    // only show style guide when mode is in debug
    if(config.env === config.envDebug) {
        $stateProvider
            .state('style-guide', {
                url: '/style-guide',
                templateUrl: '/style-guide/template.html',
                controller: 'StyleGuideController as ctrl'
            });
    }
})
.controller('StyleGuideController', ['$state',
    function($state){

        /*********************
        *   Private Variables
        **********************/
        // reference to this controller
        var that = this;

        /*********************
        *   Public Variables
        **********************/
        

        /*********************
        *   Private Functions
        **********************/

        function _init() {  
        }

        

        /*********************
        *   Public Functions
        **********************/
        

        /*********************
        *   Initialization
        **********************/
        _init();

        /*********************
        *   EVENTS
        **********************/

    }
]);
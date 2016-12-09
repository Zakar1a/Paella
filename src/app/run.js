(function () {
    'use strict';

    angular.module('PAELLAWeb').run(runBlock);

    /** @ngInject */
    function runBlock($log, $rootScope, $state, $location, Authorization) {
        $rootScope.CM = {};
        //$rootScope.CM.GET_TOKEN_REFRESH = false;
        $rootScope.CM.USER_LOGGED_IN = false;
        $rootScope.CM.CURRENTPATHISHOME = false;
        //$rootScope.$on("$locationChangeStart", function (event, next, current) {
        $rootScope.$on("$locationChangeStart", function () {
            //event.stopPropagation();  //if you don't want event to bubble up
            if ($location.path() == "/gen/login") {
                $rootScope.CM.CURRENTPATHISHOME = true;
            }else{
                $rootScope.CM.CURRENTPATHISHOME = false;
            }
        });

        if (Authorization.isLoggedIn()) {
            $rootScope.CM.USER_LOGGED_IN = true;
        }
        $log.debug('runBlock end');
    }

})();

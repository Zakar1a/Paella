(function () {
    'use strict';

    angular.module('PAELLAWeb').config(config);

    /** @ngInject */
    function config($logProvider) {
        // Enable log
        $logProvider.debugEnabled(false);   
   
        // JTW Provider Interceptors
        /*jwtInterceptorProvider.tokenGetter = function ($rootScope, Authentication, Authorization) {
            if (Authorization.isTokenExpired() && !$rootScope.CM.GET_TOKEN_REFRESH) {
                if (!Authorization.getToken() !== null) {
                    return null;
                }
                if (Authorization.isRememberMe()) {
                    $rootScope.CM.GET_TOKEN_REFRESH = true;
                    // This is a promise of a JWT id_token
                    Authentication.getNewToken().then(function () {
                        $rootScope.CM.GET_TOKEN_REFRESH = false;
                        return Authorization.getToken();
                    });
                }
            } else {
                return Authorization.getToken();
            }
        };
        $httpProvider.interceptors.push('jwtInterceptor');*/
    }
})();

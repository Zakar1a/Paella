'use strict';

/**
 * @ngdoc service
 * @name PAELLAWeb.AppUtils
 * @description
 * # Authentication
 * Service in thte PAELLAWeb.
 */
angular.module('PAELLAWeb')
        .service('Authentication', function Authentication($q, $rootScope, $location, $localstorage, RestService) {

            var that = this;

            // set methods
            // set logged user info
            that.setUserLoginInfo = function (data, remember) {
                
                     //return false;
                if (typeof (Storage) !== "undefined") {
                    var error = false;
                    var details = data.details;
                     
                    if (angular.isDefined(details.token) && details.token != "") {
                        $localstorage.set('PAELLA_TOKEN', details.token);
                        $localstorage.set('PAELLA_REMEMBER_ME', remember);
                        if (angular.isDefined(details.user_info) && details.user_info != "") {
                            $localstorage.setObject('PAELLA_USER_INFO', details.user_info);
                        }
                        $rootScope.CM.USER_LOGGED_IN = true;
                    } else {
                        error = true;
                    }

                    if (!error) {
                        //$window.location = "/";
                        if(details.setup_completed){ 
                            console.log("R1");
                            $location.path("/auth/dashboard");
                        } else {
                            console.log("R2");
                            $location.path("/auth/dashboard");
                        }
                    } else {
                        $localstorage.set('PAELLA_TOKEN', null);
                        $localstorage.set('PAELLA_REMEMBER_ME', false);
                        $localstorage.setObject('PAELLA_USER_INFO', null);
                        $location.path("/gen/login");
                    }
                } else {
                    alert("Sorry! No Web Storage support..");
                }
                return false;
            };

            // ms logout
            that.getNewToken = function () {
                // promise init
                var deffered = $q.defer();
                
                var uri = "api/get_new_token";
                
                // call to rest service
                RestService.SetAuthorizationRequired(true);
                RestService.getData(uri, {}).then(function (response) {
                    // set success data
                    if (typeof (Storage) !== "undefined") {
                        if(response.data.status){
                            var details = response.data.details;
                            if (angular.isDefined(details.token) && details.token != "") {
                                $localstorage.set('PAELLA_TOKEN', details.token);
                            } 
                        }
                    } else {
                        alert("Sorry! No Web Storage support..");
                    }
                    deffered.resolve(response);
                }, function (response) {
                    // set fail data
                    deffered.reject(response);
                });
                
                // return asynchronous data
                return deffered.promise;
            };
            
            // ms logout
            that.logout = function () {
                $rootScope.CM.USER_LOGGED_IN = false;
                if (typeof (Storage) !== "undefined") {
                    // revoke logged user info
                    $localstorage.set('PAELLA_TOKEN', null);
                    $localstorage.set('PAELLA_USER_INFO', null);
                    $localstorage.set('PAELLA_REMEMBER_ME', false);
                    $location.path("#/");
                } else {
                    alert("Sorry! No Web Storage support..");
                }
                return true;
            };

        });

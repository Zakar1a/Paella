'use strict';

/**
 * @ngdoc service
 * @name PAELLAWeb.AppUtils
 * @description
 * # Authorization
 * Service in thte PAELLAWeb.
 */
angular.module('PAELLAWeb')
        .service('Authorization', function Authorization($localstorage, $location, jwtHelper) {

            var that = this;

            that.Required = function () { 
                if (!that.isLoggedIn()) {
                    $location.path("#/");
                }
            };

            that.RequiredWith = function () {

            };
            
            // get token payload
            that.getTokenPayload = function () {
                var token = $localstorage.get('PAELLA_TOKEN', null);
                if(token!=null && token!='null' && token!=''){
                    //var tokenPayload = jwtHelper.decodeToken(token);
                    //console.log(tokenPayload);
                }
            };

            // is remember me active
            that.isRememberMe = function () {
                if (typeof (Storage) !== "undefined") {
                    var isRemember = $localstorage.get('PAELLA_REMEMBER_ME', null);
                    return isRemember;
                }
            };

            // user is lodded in or not
            that.getToken = function () {
                return $localstorage.get('PAELLA_TOKEN', null);
            };
            
            // user is lodded in or not
            that.isTokenExpired = function () {
                var token = $localstorage.get('PAELLA_TOKEN', null);
                if (token !== null && token !== "null" && token !== "") {
                    return jwtHelper.isTokenExpired(token);
                }
                return true;
            };
            
            // user is lodded in or not
            that.isLoggedIn = function () {
                var token = $localstorage.get('PAELLA_TOKEN', null); 
                var userInfo = $localstorage.getObject('PAELLA_USER_INFO'); 
                if (token !== null && token !== "null" && token !== "" && userInfo !== null) {
                    
                    var isTokenExpired = jwtHelper.isTokenExpired(token);
                    //if (!isTokenExpired) { 
                        if ((userInfo instanceof Object) && !(userInfo instanceof Array)) {
                            if (userInfo.UserID > 0) {
                                return true;
                            }
                        }
                    //}
                }
                return false;
            };

            // authorization key for user
            that.getKey = function () {
                that.getTokenPayload();
                var Token = $localstorage.get('PAELLA_TOKEN');
                var Type = "Bearer";
                return Type + ' ' + Token;
            };

            // get user info
            that.getUserInfo = function () {
                var userInfo = {};
                userInfo = $localstorage.getObject('PAELLA_USER_INFO');
                return userInfo;
            };


        });

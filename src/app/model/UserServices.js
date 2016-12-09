'use strict';

/**
 * @ngdoc service
 * @name PAELLAWeb.UserServices
 * @description
 * # User Services
 * Service in the PAELLAWeb.
 // set fail data
    deffered.reject({
        'data': data.data,
        'status': status
    });
 */

angular.module('PAELLAWeb')
        .service('UserServices', function UserServices($q, RestService) {

            var that = this; 
            
            // user login 
            that.login = function (username, password, remember) {
                // promise init
                var deffered = $q.defer();

                // request data
                var uri = "api/login";
                //var data = 'email=' + username + '&password=' + password;
                var data = {email: username , password: password, remember: remember};
                
                // call to rest service
                RestService.SetAuthorizationRequired(false);
                RestService.postData(uri, data).then(function (response) {
                    // set success data
                    deffered.resolve(response);
                }, function (response) {
                    // set fail data
                    deffered.reject(response);
                });

                // return asynchronous data
                return deffered.promise;
            }; 
            // get user profile
            that.getUserInfo = function () {
                // promise init
                var deffered = $q.defer();

                // request data
                //var uri = "api/profile?token="+RestService.getAuthorizationKey();
                var uri = "api/profile";
                var params = "";
                
                // call to rest service
                RestService.SetAuthorizationRequired(true);
                RestService.getData(uri, params).then(function (response) {
                    // set success data
                    deffered.resolve(response);
                }, function (response) {
                    // set fail data
                    deffered.reject(response);
                });

                // return asynchronous data
                return deffered.promise;
            };
            that.getAllEmplListing = function () {
                // promise init
                var deffered = $q.defer();

                // request data
                //var uri = "api/profile?token="+RestService.getAuthorizationKey();
                var uri = "employee/list";
                var params = ""; 
                // call to rest service
                RestService.SetAuthorizationRequired(false);
                RestService.getData(uri).then(function (response) {
                    // set success data
                    deffered.resolve(response);
                }, function (response) {
                    // set fail data
                    deffered.reject(response);
                });

                // return asynchronous data
                return deffered.promise;
            };
            // post Contact Form
            that.postNewEmployee = function (data) {
                // promise init
                var deffered = $q.defer();

                // request data
                var uri = "employee/create";
                var params = "";
                params = data;
                // call to rest service
                RestService.SetAuthorizationRequired(false);
                RestService.postData(uri, params).then(function (response) {
                    // set success data
                    deffered.resolve(response);
                }, function (response) {
                    // set fail data
                    deffered.reject(response);
                }); 
                // return asynchronous data
                return deffered.promise;
            };
        });

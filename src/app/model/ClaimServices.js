/**
 * Created by Zakaria on 12/5/2016.
 */
'use strict';

/**
 * @ngdoc service
 * @name PAELLAWeb.ClaimServices
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
  .service('ClaimServices', function ClaimServices($q, RestService) {

    var that = this;

    // get user profile
    that.getClaimById = function (id) {
      // promise init
      var deffered = $q.defer();

      // request data
      var uri = "claim/"+id;
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

    that.getAllClaimListing = function () {
      // promise init
      var deffered = $q.defer();

      // request data
      //var uri = "api/profile?token="+RestService.getAuthorizationKey();
      var uri = "claim/list";
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
    that.postNewClaim = function (data) {
      // promise init
      var deffered = $q.defer();

      // request data
      var uri = "claim/create";
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

    that.updateClaimStatus = function (id) {
      // promise init
      var deffered = $q.defer();

      // request data
      var uri = "claim/status/"+id;
      var params = "";
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
    var claimId = undefined;
    that.set = function(id){
      claimId = id;
    }

    that.get = function () {
      return claimId;
    }
  });

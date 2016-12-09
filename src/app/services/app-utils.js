'use strict';

/**
 * @ngdoc service
 * @name PAELLAWeb.AppUtils
 * @description
 * # AppUtils
 * Service in thte imcp.
 */
angular.module('PAELLAWeb')
        .service('AppUtils', function AppUtils() {

            var that = this;

            that.showLoadingBar = function () {
                angular.element("#loading-wating-messages").attr("style", "display:block;");
            };

            that.hideLoadingBar = function () {
                angular.element("#loading-wating-messages").attr("style", "display:none;");
            };

            that.formatDate = function (dt) {
                var d = new Date(dt);
                var datestring = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear();
                return datestring;
            };

            that.getCostCenterList = function (){
                var costCenterList  = [
                  {name:"Research and Development", value:1},
                  {name:"Marketing", value:2},
                  {name:"Human Resources", value:3},
                  {name:"Information Technology", value:4},
                  {name:"Accounting", value:5},
                  {name:"Help Desks", value:6}
                ];
                return costCenterList;
            }

            that.getCurrencyList = function (){
              var currencyList  = [
                {code:"MYR", name:"Malaysian Ringgit"},
                {code:"AUD", name:"Australian Dollar"},
                {code:"SGD", name:"Singaporean Dollar"},
                {code:"USD", name:"American Dollar"},
                {code:"GBP", name:"Great Britain Pound"},
                {code:"EUR", name:"Euro"},
                {code:"INR", name:"Indian Rupee"},
                {code:"IDR", name:"Indonesian Rupiah"},
                {code:"THB", name:"Thai Bath"},
                {code:"PHP", name:"Philippine Peso"},
                {code:"Other", name:"Other"},
              ];
              return currencyList;
            }

            that.getGLCode = function (){
              var glCodeList  = [
                {code:"4165", name:"Staff Reimbursement Mobile Claim"},
                {code:"4190", name:"Postage"},
                {code:"4191", name:"Couriers"},
                {code:"4200", name:"Stationery"},
                {code:"4311", name:"International Fares"},
                {code:"4312", name:"International Accomodation"},
                {code:"4313", name:"International Expenses"},
                {code:"4321", name:"Local Fares"},
                {code:"4322", name:"Local Accomodation"},
                {code:"4323", name:"Local Expenses"},
                {code:"4331", name:"Staff Incentives"},
                {code:"4332", name:"Staff flowers"},
                {code:"4441", name:"Candidate Flowers"},
                {code:"4451", name:"Entertainment - Clients"},
                {code:"4452", name:"Entertainment - Staff"},
                {code:"4461", name:"Subscriptions"},
                {code:"4462", name:"Memberships"}];
              return glCodeList;
            }


        });

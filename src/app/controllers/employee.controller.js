/**
 * Created by Zakaria on 12/4/2016.
 */
(function () {
  'use strict';
  angular.module('PAELLAWeb').controller('EmployeeListController', EmployeeListController);
  angular.module('PAELLAWeb').controller('EmployeeAddController', EmployeeAddController);
  /** @ngInject */
 function EmployeeListController($log, UserServices, Authorization, AppUtils) {
    $log.log("EmployeeListController");
    Authorization.Required();
    var vm = this;
    vm.gridOptions = {
      data: [], //required parameter - array with data
    };
    vm.getUserEmplList = getUserEmplListFn;
    vm.getUserEmplList();
    function getUserEmplListFn() {
      UserServices.getAllEmplListing().then(function (response) {
        // set success data
        $log.log(response);
        vm.gridOptions.data = response.data;
      }, function (response) {
        // set fail data
        $log.log(response);
      });
    }
  }
  /**@ngInject*/
  function EmployeeAddController($log, UserServices, Authorization, AppUtils, MessageUtils) {
    $log.log("EmployeeAddController");
    Authorization.Required();
    var vm = this;
    var empinf = {firstName: "", lastName: "", phone: "", email: "", nric: "", password:""};
    vm.empinfo = empinf;
    vm.addEmployee = addEmployeeFn;

   /* vm.employeeList  = [
      {name:"George", age:32, retiredate:"March 12, 2014"},
      {name:"Edward", age:17, retiredate:"June 2, 2023"},
      {name:"Christine", age:58, retiredate:"December 20, 2036"},
      {name:"Sarah", age:62, retiredate:"April 30, 2020"}
    ];*/

    vm.open = function ($event) {
      $event.preventDefault();
      $event.stopPropagation();

      vm.opened = true;
    };
    vm.dateOptions = {
      formatYear: 'yy',
      startingDay: 1,
      minDate: new Date(2015, 9, 9)
    };
    vm.format = 'MM-dd-yyyy';

    function addEmployeeFn(){
      $log.log("Create Employee");
      var message, error = false;
      var messageObj = {};
      $log.log(vm.empinfo);
      //General Validation
      if (vm.empinfo.firstName == "") {
        message = "First Name is mandatory";
        error = true;
      }
      if (vm.empinfo.nric == "") {
        message = "NRIC/Passport is mandatory";
        error = true;
      }
      if (vm.empinfo.email == "") {
        message = "Email is mandatory";
        error = true;
      } else {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var emvalid = re.test(vm.empinfo.email);
        if (!emvalid) {
          message = "Invalid email address!";
          error = true;
        }
      }
      if (vm.empinfo.phone == "") {
        message = "Phone number is mandatory";
        error = true;
      }
      $log.log(vm.empinfo);
      //return false;

      if (!error) {
        AppUtils.showLoadingBar();
        UserServices.postNewEmployee(vm.empinfo).then(function (response) {
          AppUtils.hideLoadingBar();
          // set success data
          $log.log("success", response);
          messageObj = MessageUtils.MessageParser(response, "Create Employee");
          MessageUtils.ToasterMessage(messageObj);
          if (response.data.code == 1) {
            console.log("Code :: "+response.data.code);
            vm.empinfo = {firstName: "", lastName: "", phone: "", email: "", nric: "", password:""};
          }
        }, function (response) {
          AppUtils.hideLoadingBar();
          // set fail data
          $log.log("error", response);
          messageObj = MessageUtils.MessageParser(response);
          MessageUtils.ToasterMessage(messageObj);
        });
      } else {
        messageObj = MessageUtils.getMessageObj("error", "Create Employee", message);
        MessageUtils.ToasterMessage(messageObj);
      }
    }
    $log.log("EmployeeAddController");
  }
})();


/**
 * Created by Zakaria on 12/4/2016.
 */
(function () {
    'use strict';
    angular.module('PAELLAWeb').controller('UserController', UserController);
    angular.module('PAELLAWeb').controller('NewUserDashboardController', NewUserDashboardController);
    angular.module('PAELLAWeb').controller('UserTopNavController', UserTopNavController);
    angular.module('PAELLAWeb').controller('UserLogoutController', UserLogoutController);
    angular.module('PAELLAWeb').controller('UtilsController', UtilsController);
    /** @ngInject */
    function UtilsController($log, Authorization, $state, $rootScope) {
        var vm = this;
        vm.ACTIVE_STATE_CLASS = {};
        vm.ACTIVE_STATE_CLASS[$state.current.name] = 'active';
        //
        var deregisterationCallback = $rootScope.$on('$stateChangeSuccess', function () {
            vm.ACTIVE_STATE_CLASS = {};
            vm.ACTIVE_STATE_CLASS[$state.current.name] = 'active';
        });
        $rootScope.$on('$destroy', deregisterationCallback);
        $rootScope.userinfo = Authorization.getUserInfo();
    }
    /** @ngInject */
    function UserController($log, Authentication, UserServices, MessageUtils, AppUtils) {

        var vm = this;
        vm.email = "";
        vm.password = "";
        vm.flagloading = false;

        // method's
        vm.login = userLogin;

        // Login Method
        function userLogin() {
            var message, error = false;
            var messageObj = {};
            if (vm.email == "") {
                message = "Email missing";
                error = true;
            } else if (vm.password == "") {
                message = "Password missing";
                error = true;
            }
            if (vm.email != "") {
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                var emvalid = re.test(vm.email);
                if (!emvalid) {
                    message = "Invalid email address!";
                    error = true;
                }
            }
            console.log(vm.email, vm.password);
            //return false;
            if (!error) {
                AppUtils.showLoadingBar();
                if (vm.email == "admin@randstad.com") {
                    console.log("1");
                    if (vm.password == "admin") {
                        console.log("2");
                        AppUtils.hideLoadingBar();
//                        var msg = {"status": false, "code": 400, "message": "Invalid Credentials"};
                        var response = {"status": true, "code": 0, "details": {"token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjE2LCJpc3MiOiJodHRwczpcL1wvd3d3LmNhcnNtdW5kby5jb21cL2NtYWRtaW5cL3B1YmxpY1wvYXBpXC9sb2dpbiIsImlhdCI6MTQ4MDY5MTE2NywiZXhwIjoxNDgwNzM0MzY3LCJuYmYiOjE0ODA2OTExNjcsImp0aSI6IjI5MDc3OTJmZWQwNzQ5NTY3MWRlZjk0ZTY5MWQ1ODM4In0.pRShGWmnppzm-sL8qnLGT91c1d1E6nPLm5yjszKw1Yo", "token_expiry_limit": 720, "token_expiry": "2016-12-03 03:06:07", "setup_completed": true, "user_info": {"UserID": 1, "FirstName": "Abu", "LastName": "Ahmed", "Address": "", "City": "Dhaka", "State": "Dhaka", "Zip": "1207", "HomePhone": "", "CompanyName": "", "IsAvatar": "1", "ImagePath": "", "IsDealer": "false", "email": "admin@randstad.com", "PhoneNumber": "", "user_roles": [{"UserID": "16", "RoleID": "3", "role": {"RoleID": "3", "Designation": "Dealer", "Comments": "Dealer of cars list"}}, {"UserID": "16", "RoleID": "4", "role": {"RoleID": "4", "Designation": "Admin", "Comments": "System user"}}]}}, "token_expiry": "2050-12-03 03:06:07", "current_time": "2016-12-02 15:06:07"};
                        Authentication.setUserLoginInfo(response, false);
                    } else {
                        console.log("2V");
                        AppUtils.hideLoadingBar();
                        message = "Invalid User";
                        messageObj = MessageUtils.getMessageObj("error", "Login", message);
                        MessageUtils.ToasterMessage(messageObj);
                    }
                } else {
                    console.log("1V");
                    AppUtils.hideLoadingBar();
                    message = "Invalid Password";
                    messageObj = MessageUtils.getMessageObj("error", "Login", message);
                    MessageUtils.ToasterMessage(messageObj);
                }
            } else {
                messageObj = MessageUtils.getMessageObj("error", "Login", message);
                MessageUtils.ToasterMessage(messageObj);
            }
        }

    }
    /**@ngInject*/
    function NewUserDashboardController($log, UserServices, Authorization, AppUtils) {
        $log.log("UserNewDashboardController");
        Authorization.Required();
        var vm = this;
    }
    /*/!**@ngInject*!/
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
    /!**@ngInject*!/
    function EmployeeAddController($log, UserServices, Authorization, AppUtils, MessageUtils) {
        $log.log("EmployeeAddController");
        Authorization.Required();
        var vm = this;
        var empinf = {firstName: "", lastName: "", phone: "", email: "", nric: "", password:""};
        vm.empinfo = empinf;
        vm.addEmployee = addEmployeeFn;

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
    }*/
    /**@ngInject*/
    function UserTopNavController($log, $rootScope, Authorization) {
        Authorization.Required();
        $rootScope.userinfo = Authorization.getUserInfo();
    }
    /** @ngInject */
    function UserLogoutController($log, Authentication) {
        $log.log("Fire Logout Controller");
        Authentication.logout();
    }
})();

/**
 * Created by Zakaria on 12/5/2016.
 */
(function () {
  'use strict';
   angular.module('PAELLAWeb').controller('ClaimEditController', ClaimEditController);
   angular.module('PAELLAWeb').controller('ClaimListController', ClaimListController);
  /**@ngInject*/
  function ClaimEditController($log, ClaimServices,UserServices, Authorization, AppUtils, MessageUtils,$uibModal) {
    $log.log("ClaimEditController");
    Authorization.Required();
    var vm = this;

    //vm.getUserEmplList = getUserEmplListFn;

    vm.employeeList = [];
    vm.employeeId = undefined;
    getUserEmplListFn();
    vm.costCenterList = AppUtils.getCostCenterList();
    vm.glCodeList = AppUtils.getGLCode();
    vm.currencyList = AppUtils.getCurrencyList();


    var detailObj = {id: "", claimId: "", transactionDate: "", costCenter: "", glCode: "",
      description: "", currency: "",amount: "", gst: "", exchangeRate: "", recieptNo: "", totalAmount: ""};
    //vm.claiminfo = claiminf;
    var cid = ClaimServices.get();
    if(cid != undefined){
      vm.claiminfo = getClaimById(cid);
    }
    vm.addDetailsShow = false;
    vm.detailinfo = detailObj;
    vm.selectEmployee = function(){
      vm.employeeId = parseInt(vm.employeeId);
      var emp = getSelectedEmp(vm.employeeId);
      if(emp != undefined){
        vm.claiminfo.empolyee = emp;
        vm.accountName = emp.accountName;
        vm.accountNumber = emp.accountNumber;
        vm.bankCode = emp.bankCode;
      }
    }
    vm.open = function ($event) {
      $event.preventDefault();
      $event.stopPropagation();

      vm.opened = true;
    };
    vm.dateOptions = {
      formatYear: 'yy',
      startingDay: 1,
      minDate: new Date(2010, 1, 1)
    };
    vm.format = 'MMM-dd-yyyy';

    vm.clmDetails = [];
    vm.gridOptions = {
      data: [],
      urlSync: false//required parameter - array with data
    };
    vm.gridActions = {};
    vm.addDetails = addDetailsFn;
    vm.saveClaim = editClaimFn;
    function editClaimFn(){
      $log.log("Save Claim");
      var message, error = false;
      var messageObj = {};
      $log.log(vm.empinfo);
       //General Validation
       if (vm.claiminfo.empolyee == undefined) {
       message = "Employee is mandatory";
       error = true;
       }
       if (vm.clmDetails.length === 0) {
       message = "Cliam detail is mandatory";
       error = true;
       }

       $log.log(vm.claiminfo);
       //return false;*/

      if (!error) {
        AppUtils.showLoadingBar();
        vm.claiminfo.claimDetails = vm.clmDetails;;
        ClaimServices.postNewClaim(vm.claiminfo).then(function (response) {
          AppUtils.hideLoadingBar();
          // set success data
          $log.log("success", response);
          messageObj = MessageUtils.MessageParser(response, "Save Claim");
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
        messageObj = MessageUtils.getMessageObj("error", "Save Claim", message);
        MessageUtils.ToasterMessage(messageObj);
      }
    }

    function addDetailsFn(){
      vm.addDetailsShow = true;
    }


    vm.doneEdit = doneEditFn;
    vm.grnTotal = 0;
    vm.claiminfo.amount = vm.grnTotal;
    function doneEditFn(){
      $log.log(vm.detailinfo);
      vm.detailinfo.transactionDate = new Date( vm.detailinfo.txnDate).getTime();
      vm.clmDetails.push(vm.detailinfo);
      var a = parseFloat(vm.detailinfo.totalAmount);
      vm.grnTotal =  vm.grnTotal+a;
      vm.claiminfo.amount =  vm.grnTotal;
      vm.gridActions.refresh();
      $log.log(vm.gridOptions.data);
      vm.gridOptions.data =  vm.clmDetails;
      vm.gridActions.refresh();
      vm.detailinfo =  {id: "", claimId: "", transactionDate: "", costCenter: "", glCode: "",
        description: "", currency: "",amount: "", gst: "", exchangeRate: "", recieptNo: "", totalAmount: ""};
      vm.addDetailsShow = false;
    }

    vm.calcTotal = calcTotalFn;
    function calcTotalFn(){
      if(vm.detailinfo.amount === undefined)
      {
          return;
      }
      var gst = 0, rate = 1;
      if(vm.detailinfo.gst !== "")
      {
        gst = parseFloat(vm.detailinfo.gst);
      }
      if(vm.detailinfo.exchangeRate !== "")
      {
        rate = parseFloat(vm.detailinfo.exchangeRate);
      }
      var amt = parseFloat(vm.detailinfo.amount);
      var total = (amt +gst)*rate;
      vm.detailinfo.totalAmount = total;
    }

    function getUserEmplListFn() {
      UserServices.getAllEmplListing().then(function (response) {
        // set success data
        $log.log(response);
        vm.employeeList = response.data;
      }, function (response) {
        // set fail data
        $log.log(response);
      });
    }
    function getSelectedEmp(id) {
      var i;
      for(i = 0; i< vm.employeeList.length; i++ ){
        if(vm.employeeList[i].id === id){
          return vm.employeeList[i];
        }
      }
      return undefined;
    }

    function getClaimById (id) {
      that.getClaimById().then(function (response) {
        return response.data;
      }, function (response) {
        var claiminf = {id: "", empolyee: "", claimDate: "", amount: "", status: "", claimDetails:{}};
        return claiminf;
      });
    }
    $log.log("ClaimEditController");
  }
  /** @ngInject */
  function ClaimListController($log, ClaimServices, Authorization, AppUtils, MessageUtils, $location, $rootScope) {
    $log.log("ClaimListController");
    Authorization.Required();
    var messageObj = {};
    var vm = this;
    vm.gridOptions = {
      data: [], //required parameter - array with data
    };
    vm.getClaimList = getClaimListFn;
    vm.getClaimList();
    vm.approveClaim = function(id){
      AppUtils.showLoadingBar();
      ClaimServices.updateClaimStatus(id).then(function (response) {
        AppUtils.hideLoadingBar();
        $log.log("success", response);
        messageObj = MessageUtils.MessageParser(response, "Claim Status");
        MessageUtils.ToasterMessage(messageObj);
      }, function (response) {
        AppUtils.hideLoadingBar();
        // set fail data
        $log.log("error", response);
        messageObj = MessageUtils.MessageParser(response);
        MessageUtils.ToasterMessage(messageObj);
      });
    }

    vm.forwardToClaim = function(id){
      ClaimServices.set(id);
      var deregisterationCallback = $rootScope.$on('$stateChangeSuccess', function () {
        vm.ACTIVE_STATE_CLASS = {};
        vm.ACTIVE_STATE_CLASS[$state.current.name] = 'active';
      });
      $rootScope.$on('$destroy', deregisterationCallback);
      $rootScope.userinfo = Authorization.getUserInfo();
      $location.path("#/auth/claim-edit");
    }
    function getClaimListFn() {
      ClaimServices.getAllClaimListing().then(function (response) {
        // set success data
        $log.log(response);
        var clist = response.data;
       /* for(var i = 0; i < clist.length; i++){
          if(clist[i].status === 0){
            clist[i].status = "Pending";
          }else{
            clist[i].status = "Already Approved";
          }
        }*/
        vm.gridOptions.data = clist;
      }, function (response) {
        // set fail data
        $log.log(response);
      });
    }
  }
})();


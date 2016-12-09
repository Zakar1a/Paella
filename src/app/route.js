(function () {
    'use strict';

    angular.module('PAELLAWeb').config(routerConfig);
    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/gen/login');

        $stateProvider.state('gen', {
            abstract: true,
            url: '/gen',
            templateUrl: 'app/paella-tpl/layout/general-tpl.html'
        }).state('gen.login', {
            url: '/login',
            controller: 'UserController',
            controllerAs: 'useraccess',
            templateUrl: 'app/paella-tpl/public/login.html'
        }).state('gen.logout', {
            url: '/logout',
            controller: 'UserLogoutController',
            controllerAs: 'userLogout',
            templateUrl: 'app/paella-tpl/common/blank_with_min_height.html'
        });

        $stateProvider.state('auth', {
            abstract: true,
            url: '/auth',
            templateUrl: 'app/paella-tpl/user/auth-tpl.html'
        }).state('auth.dashboard', {
            url: '/dashboard',
            controller: 'NewUserDashboardController',
            controllerAs: 'newdashboard',
            templateUrl: 'app/paella-tpl/user/dashboard.html'
        }).state('auth.employee-list', {
            url: '/employee-list',
            controller: 'EmployeeListController',
            controllerAs: 'employeelist',
            templateUrl: 'app/paella-tpl/user/employee-list.html'
        }).state('auth.employee-add', {
            url: '/employee-add',
            controller: 'EmployeeAddController',
            controllerAs: 'employeeadd',
            templateUrl: 'app/paella-tpl/user/employee-add.html'
        }).state('auth.claim-list', {
          url: '/claim-list',
          controller: 'ClaimListController',
          controllerAs: 'claimlist',
          templateUrl: 'app/paella-tpl/claim/claim-list.html'
        }).state('auth.claim-edit', {
            url: '/claim-edit',
            controller: 'ClaimEditController',
            controllerAs: 'claimedit',
            templateUrl: 'app/paella-tpl/claim/claim-edit.html'
        });
    }

})();

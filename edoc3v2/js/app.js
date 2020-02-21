angular.module('app', ['ui.router', 'ngMaterial', 'ngMessages', 'ngAnimate', 'ngSanitize', 'LocalStorageModule', 'md.data.table'])

    .config(function (localStorageServiceProvider, $stateProvider, $urlRouterProvider) {

        localStorageServiceProvider.setPrefix('edoc3');

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl',
            })
            .state('main', {
                url: '/main',
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
            })
            // edoc
            .state('main.edoc', {
                url: '/edoc',
                templateUrl: 'views/edoc/edoc.html',
                controller: 'EdocCtrl',
            })
            // emeeting
            .state('main.emeeting', {
                url: '/emeeting',
                templateUrl: 'views/emeeting/emeeting.html',
                controller: 'EmeetingCtrl',
            })
            //BI
            .state('main.bi', {
                url: '/bi',
                templateUrl: 'views/bi/bi.html',
                controller: 'BiCtrl',
                redirectTo: 'main.bi.dashboard',
            })
            .state('main.bi.dashboard', {
                url: '/dashboard',
                templateUrl: 'views/bi/bi.dashboard.html',
                controller: 'FaqCTRL',
            })
            .state('main.bi.StudentReport1', {
                url: '/StudentApply/{id}',
                templateUrl: 'views/bi/student/bi.StudentReport1.html',
                controller: 'StdApplyCTRL',
            })
            .state('main.bi.StudentReport2', {
                url: '/Student/{id}',
                templateUrl: 'views/bi/student/bi.StudentReport2.html',
                controller: 'StdCTRL',
            })
            .state('main.bi.StudentReport3', {
                url: '/StudentDeptRegister/{id}',
                templateUrl: 'views/bi/student/bi.StudentReport3.html',
                controller: 'StdDebtRegisCTRL',
            })
            .state('main.bi.StudentReport4', {
                url: '/StudentBalanceRegister/{id}',
                templateUrl: 'views/bi/student/bi.StudentReport4.html',
                controller: 'StdBalanceRegisCTRL',
            })
            .state('main.bi.StaffReport1', {
                url: '/StaffSupportAndAcadamic/{id}',
                templateUrl: 'views/bi/staff/bi.StaffReport1.html',
                controller: 'StaffLineCTRL',
            })
            //BI-old
            .state('main.mainstats', {
                url: '/mainstats',
                controller: 'MenuCtrl',
                templateUrl: 'views/stats/mainstats.html',
                redirectTo: 'main.mainstats.stafftype',
            })
            .state('main.mainstats.stafftype', {
                url: '/stafftype',
                controller: 'StatsCtrl',
                templateUrl: 'views/stats/mainstats.stafftype.html'
            })
            .state('main.mainstats.staffstartwork', {
                url: '/staffstartwork',
                controller: 'StatsstaffworkCtrl',
                templateUrl: 'views/stats/mainstats.staffstartwork.html'
            })
            .state('main.mainstats.disteducation', {
                url: '/disteducation',
                controller: 'StatdisteducationCtrl',
                templateUrl: 'views/stats/mainstats.disteducation.html'
            })
            .state('main.mainstats.staffline', {
                url: '/staffline',
                controller: 'StafflineCtrl',
                templateUrl: 'views/stats/mainstats.staffline.html'
            })
            .state('main.mainstats.stddetails', {
                url: '/stddetails',
                controller: 'StddetailsCTRL',
                templateUrl: 'views/stats/mainstats.stddetails.html'
            })


            .state('logout', {
                url: '/logout',
                onEnter: function (UserService) {
                    UserService.logout();
                },
                controller: function ($state) {
                    $state.go('login');
                }
            })

        $urlRouterProvider.otherwise('/login');

    })

    .run(function (UserService, $rootScope, Setting) {

        UserService.load();
        $rootScope.title = Setting.appName;
        $rootScope.version = Setting.version;

    });
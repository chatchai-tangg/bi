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
            .state('main.mainstats', {
                url: '/mainstats',
                controller: 'MenuCtrl',
                templateUrl: 'views/stats/mainstats.html',
                redirectTo: 'main.mainstats.stdplan',
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
            .state('main.mainstats.stdplan', {
                url: '/StudentPlan',
                controller: 'StdplanCTRL',
                templateUrl: 'views/stats/mainstats.stdplan.html'
            })
            .state('main.mainstats.studentapply', {
                url: '/Studentapply/{id}',
                controller: 'StdApplyCTRL',
                templateUrl: 'views/stats/stdbudget/studentapply.html'
            })
            .state('main.mainstats.student', {
                url: '/Student/{id}',
                controller: 'StdCTRL',
                templateUrl: 'views/stats/stdbudget/student.html'
            })
            .state('main.mainstats.studentdebtregis', {
                url: '/StudentDebtRegis/{id}',
                controller: 'StdDebtRegisCTRL',
                templateUrl: 'views/stats/stdbudget/studentdebtregis.html'
            })
            .state('main.mainstats.Staffline', {
                url: '/StaffSupportandAcadamic/{id}',
                controller: 'StaffLineCTRL',
                templateUrl: 'views/stats/staff/Staffline.html'
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
angular.module('app', ['ui.router', 'ngMaterial', 'ngMessages', 'ngAnimate', 'ngSanitize', 'LocalStorageModule'])

    .config(function (localStorageServiceProvider, $stateProvider, $urlRouterProvider, $mdThemingProvider, $mdDateLocaleProvider) {

        localStorageServiceProvider.setPrefix('edoc3');

        $mdThemingProvider.theme('default')
            .primaryPalette('deep-purple')
            .accentPalette('deep-orange');

        $mdThemingProvider.theme('sidenav')
            .primaryPalette('deep-purple', {
                'default': '700'
            })
            .dark();

        $mdThemingProvider.theme('toolbar')
            .primaryPalette('grey', {
                'default': '200'
            });

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
                redirectTo: 'main.edoc.inbox',
            })
            .state('main.edoc.inbox', {
                url: '/inbox',
                templateUrl: 'views/edoc/edoc.inbox.html',
                controller: 'EdocInboxCtrl',
            })
            .state('main.edoc.create', {
                url: '/create',
                templateUrl: 'views/edoc/edoc.create.html',
                controller: 'EdocCreateCtrl',
            })
            // emeeting
            .state('main.emeeting', {
                url: '/emeeting',
                templateUrl: 'views/emeeting/emeeting.html',
                controller: 'EmeetingCtrl',
                redirectTo: 'main.emeeting.mymeeting',
            })
            .state('main.emeeting.mymeeting', {
                url: '/mymeeting',
                templateUrl: 'views/emeeting/emeeting.mymeeting.html',
            })
            .state('main.emeeting.all', {
                url: '/all',
                templateUrl: 'views/emeeting/emeeting.all.html',
            })

            //BI
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

        $mdDateLocaleProvider.months = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
        $mdDateLocaleProvider.shortMonths = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
        $mdDateLocaleProvider.days = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];
        $mdDateLocaleProvider.shortDays = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];
        $mdDateLocaleProvider.monthHeaderFormatter = function (date) {
            return $mdDateLocaleProvider.shortMonths[date.getMonth()] + ' ' + (date.getFullYear() + 543);
        };
        $mdDateLocaleProvider.formatDate = function (date) {
            return `${moment(date).format('DD/MM')}/${moment(date).get('year') + 543}`;
        };
        $mdDateLocaleProvider.parseDate = function (dateString) {
            var dateArray = dateString.split("/");
            dateString = dateArray[1] + "/" + dateArray[0] + "/" + (dateArray[2] - 543);
            var m = moment(dateString, 'L', true);
            return m.isValid() ? m.toDate() : new Date(NaN);
        };

    })

    .run(function (UserService, $rootScope, Setting) {

        UserService.load();
        $rootScope.title = Setting.appName;
        $rootScope.version = Setting.version;

    });
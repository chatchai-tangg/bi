angular.module('app')

    .controller('MainCtrl', function ($scope, UserService, $state, $mdSidenav) {

        if (!UserService.isLoggedIn()) {
            $state.go('login');
        }

        $scope.user = UserService.info;

        $scope.toggleSidenav = function () {
            $mdSidenav('sidenav-left').toggle();
        }

        $scope.menu = [{
                name: 'สารบรรณ',
                ref: 'main.edoc',
                icon: 'insert_drive_file'
            },
            {
                name: 'ประชุม',
                ref: 'main.emeeting',
                icon: 'people'
            },
            {
                name: 'แดชบอร์ด',
                ref: 'main.mainstats',
                icon: 'insert_chart_outlined'
            },
        ];

        $scope.closeSidenav = function (title) {
            $mdSidenav('sidenav-left').close();
        };

        $scope.userMenu = function ($mdMenu, ev) {
            originatorEv = ev;
            $mdMenu.open(ev);
        };


    })
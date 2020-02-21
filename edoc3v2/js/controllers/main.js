angular.module('app')

.controller('MainCtrl', function( $scope, UserService, $state, $mdSidenav, $mdMedia, $rootScope ){

    if( !UserService.isLoggedIn() ){
        $state.go('login');
    }

    $scope.sidenavLocked = true;
    $scope.user = UserService.info;
    $scope.$mdMedia = $mdMedia;

    $scope.toggleSidenav = function() {
        $mdSidenav('sidenav-left').toggle();
    }

    $scope.toggleSidenavLocked = function() {
        $scope.sidenavLocked = !$scope.sidenavLocked;
    }

    $scope.menu=[
        {name: 'สถิติ', ref:'main.mainstats', icon:'pie_chart'},
        {name: 'สถิติ v2', ref:'main.bi', icon:'pie_chart'},
        {name: 'สารบรรณ', ref:'main.edoc', icon:'insert_drive_file'},
        {name: 'ประชุม', ref:'main.emeeting', icon:'people'},
    ];

    $scope.closeSidenav = function(title){
        $mdSidenav('sidenav-left').close();
    };

    $scope.userMenu = function($mdMenu, ev) {
        originatorEv = ev;
        $mdMenu.open(ev);
    };

    $rootScope.rightSideNav = {
        title : 'Sidenav Right',
        sections: [],
    };
    $scope.closeRightSideNav = function(){
        $mdSidenav('sidenav-right').close();
    };

})

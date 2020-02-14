angular.module('app')

.controller('EdocCtrl', function( $scope, $state, $rootScope ){

    $rootScope.pageTitle = 'สารบรรณ'

    $scope.currentNav = getChildStatename($state.$current.name);

    // $scope.menu = [
    //     {name: 'inbox', label:'Inbox', state:'main.edoc.inbox'},
    //     {name: 'create', label:'Create', state:'main.edoc.create'},
    // ];

})

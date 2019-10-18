angular.module('app')

.controller('LoginCtrl', function( $scope, $http, UserService, $state, Setting ){

    if( UserService.isLoggedIn() ){
        $state.go('main.edoc');
    }

    $scope.isLoading=false;
    $scope.hasError=false;
    $scope.errorMsg='';

    $scope.login = function( user ){

        $scope.isLoading=true;
        $scope.hasError=false;

        $http({
            url: Setting.baseApi+'/LoginAuthEdoc',
            headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'},
            method: 'POST',
            params: user,
        })
        .then(
            function(res){
                $scope.isLoading=false;
                console.log(res.data);
                if( res.data.status=='OK' ){
                    $scope.hasError=false;
                    UserService.info = res.data;
                    UserService.save();
                    $state.go(Setting.afterLoginState);
                }else{
                    $scope.hasError=true;
                    $scope.errorMsg=res.data.status;
                }
            },
            function(error){
                $scope.isLoading=false;
                console.log(error);
            }
        );

    }

})

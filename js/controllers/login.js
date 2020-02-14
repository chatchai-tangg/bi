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
            //url https://app.rmutp.ac.th/api/edoc/login
            url: Setting.baseApi+'/edoc/login',
            method: 'POST',
            data: user,
        })
        .then(
            function(res){
                $scope.isLoading=false;
                console.log(res.data);
                if( res.data.status=='ok' ){
                    $scope.hasError=false;
                    UserService.info = res.data.userinfo;
                    UserService.save();
                    $state.go(Setting.afterLoginState);
                }else{
                    $scope.hasError=true;
                    $scope.errorMsg=res.data.message;
                }
            },
            function(error){
                $scope.isLoading=false;
                console.log(error);
            }
        );

    }

})

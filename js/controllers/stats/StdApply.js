angular.module('app')

    .controller('StdApplyCTRL', function ($scope, $rootScope, $http, $state, $stateParams) {

        var id = $stateParams.id;

        $http({
            url: 'https://app.rmutp.ac.th/api/bi/STD/studentApplyByYear/' + id,
            method: 'GET',
            data: {
                id: id
            }

        }).then(
            function (res) {

                $scope.acadyear = res.data.map(res => res.ACADYEAR);
                $scope.applycant = res.data.map(res => res.COUNT_APPLICANTID);
                $scope.facname = res.data.map(res => res.FACULTYNAME);
                $scope.datatestt();
            },
            function (error) {
                console.log(error);
            }
        )

        $scope.datatestt = function () {

            var data = {
                labels: $scope.facname,
                datasets: [{
                    label: "เงินลงทะเบียนทั้งสิ้น",
                    data: $scope.applycant,
                    backgroundColor: "rgb(178,255,102,0.8)",
                    borderColor: "#B2FF66",
                }, ],
            };

            $(document).ready(
                function () {
                    var canvas = document.getElementById("myChart");
                    var ctx = canvas.getContext("2d");
                    var myNewChart = new Chart(ctx, {
                        type: 'bar',
                        data: data,

                    }, );
                }
            );
        }


    })
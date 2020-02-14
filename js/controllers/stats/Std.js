angular.module('app')

    .controller('StdCTRL', function ($scope, $rootScope, $http, $state, $stateParams) {

        var id = $stateParams.id;

        $http({
            url: 'https://app.rmutp.ac.th/api/bi/STD/studentByYear/' + id,
            method: 'GET',
            data: {
                id: id
            }

        }).then(
            function (res) {
                $scope.acadyear = res.data.map(res => res.ACADYEAR);
                $scope.studycant = res.data.map(res => res.STUDENT);
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
                    label: "จำนวนนักศึกษา",
                    data: $scope.studycant,
                    backgroundColor: "rgb(178,255,102,0.8)",
                    borderColor: "#B2FF66",
                }, ],
            };

            $(document).ready(
                function () {
                    var canvas = document.getElementById("Chartstudentdistfac");
                    var ctx = canvas.getContext("2d");
                    var myNewChart = new Chart(ctx, {
                        type: 'bar',
                        data: data,

                    }, );
                }
            );
        }


    })
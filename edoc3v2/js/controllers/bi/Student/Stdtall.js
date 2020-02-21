angular.module('app')

    .controller('StdCTRL', function ($scope, $rootScope, $http, $state, $stateParams) {

        var id = $stateParams.id;
        var myColors = '#00ADF4';
        // var myColors = ['#2D4FA5', '#00A447', '#F0B8602', '#D9242A', '#C40C70', '#027DC9', '#5CB339', '#FADD00',
        //     '#DE5C1F', '#D9058E', '#00ADF4', '#97C51F'
        // ];

        function commaify(value) {
            var result = ('' + value).replace(/^(-?\d+)(\d{3})/, '$1,$2');
            return value == result ? result : commaify(result);
        }

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
                    label: "นักศึกษาปีการศึกษา " + id,
                    data: $scope.studycant,
                    backgroundColor: myColors,
                    // borderColor: "#B2FF66",
                }, ],
            };

            $(document).ready(
                function () {
                    var canvas = document.getElementById("Chartstudentdistfac");
                    var ctx = canvas.getContext("2d");
                    var myNewChart = new Chart(ctx, {
                        type: 'bar',
                        data: data,
                        options: {
                            plugins: {
                                datalabels: {
                                    formatter: function (value) {
                                        return commaify(value);
                                        // return '$' + commaify(value);
                                    },
                                    anchor: 'end',
                                    align: 'end',
                                    color: 'black',
                                    labels: {
                                        title: {
                                            font: {
                                                weight: 'bold'
                                            }
                                        },
                                    },
                                }
                            }
                        }
                    }, );
                }
            );
        }


    })
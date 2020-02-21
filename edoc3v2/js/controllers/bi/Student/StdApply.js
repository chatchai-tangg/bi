angular.module('app')

    .controller('StdApplyCTRL', function ($scope, $http, $stateParams) {

        var id = $stateParams.id;
        var myColors = '#B379AA';
        // var myColors = ['#C52A66', '#C42939', '#562930', '#9877AF', '#9FCDB6', '#D55586', '#D76776', '#C2AC7A',
        //     '#B379AA', '#B8D0EA', '#E79EBE', '#E99885'
        // ];

        function commaify(value) {
            var result = ('' + value).replace(/^(-?\d+)(\d{3})/, '$1,$2');
            return value == result ? result : commaify(result);
        }

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
                $scope.facname = res.data.map(res => res.FACNAME);
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
                    label: "ปีการศึกษา " + id,
                    data: $scope.applycant,
                    fill: false,
                    backgroundColor: myColors,
                    // borderColor: "#B2FF66",
                }, ],
            };

            $(document).ready(
                function () {
                    var canvas = document.getElementById("myChart");
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
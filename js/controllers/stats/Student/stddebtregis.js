angular.module('app')

    .controller('StdDebtRegisCTRL', function ($scope, $http, $stateParams) {

        var id = $stateParams.id;

        function commaify(value) {
            var result = ('' + value).replace(/^(-?\d+)(\d{3})/, '$1,$2');
            return value == result ? result : commaify(result);
        }

        $http({
            url: 'https://app.rmutp.ac.th/api/bi/STD/StudentDebtRegisByFac/' + id,
            method: 'GET',
            data: {
                id: id
            }

        }).then(
            function (res) {
                $scope.acadyear = res.data.map(res => res.ACADYEAR);
                $scope.sumamount = res.data.map(res => res.SUM_AMOUNT);
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
                    label: "ปีการศึกษา " + id,
                    data: $scope.sumamount,
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
                        options: {
                            plugins: {
                                datalabels: {
                                    formatter: function (value) {
                                        return commaify(value);
                                        // return '$' + commaify(value);
                                    },
                                }
                            },
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true,
                                        callback: function (value) {
                                            var ranges = [{
                                                    divider: 1e6,
                                                    suffix: 'M'
                                                },
                                                {
                                                    divider: 1e3,
                                                    suffix: 'k'
                                                }
                                            ];

                                            function formatNumber(n) {
                                                for (var i = 0; i < ranges.length; i++) {
                                                    if (n >= ranges[i].divider) {
                                                        return (n / ranges[i].divider).toString() + ranges[i].suffix;
                                                    }
                                                }
                                                return n;
                                            }
                                            return formatNumber(value);
                                        }
                                    }
                                }]
                            },
                        }
                    }, );
                }
            );
        }


    })
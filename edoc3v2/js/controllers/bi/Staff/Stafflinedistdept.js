angular.module('app')

    .controller('StaffLineCTRL', function ($scope, $http, $stateParams) {

        var id = $stateParams.id;

        function commaify(value) {
            var result = ('' + value).replace(/^(-?\d+)(\d{3})/, '$1,$2');
            return value == result ? result : commaify(result);
        }

        $http({
            url: 'https://app.rmutp.ac.th/api/bi/hrm/staffsupportdistfac/' + id,
            method: 'GET',
            data: {
                id: id
            }

        }).then(
            function (res) {
                $scope.supportstaffdistfac = res.data.Supportdistfac.map(ss => ss.people);
                $scope.acadamicstaffdistfac = res.data.Acadamicdistfac.map(ss => ss.people);
                $scope.suplinenamedistfac = res.data.Supportdistfac.map(ss => ss.people_type);
                $scope.acalinenamedistfac = res.data.Acadamicdistfac.map(ss => ss.people_type);
                $scope.acadepthnamedistfac = res.data.Acadamicdistfac.map(ss => ss.dept_name_th);
                $scope.supdepthnamedistfac = res.data.Supportdistfac.map(ss => ss.dept_name_th);

                $scope.supportstaff = res.data.Support.map(ss => ss.people);
                $scope.acadamicstaff = res.data.Acadamic.map(ss => ss.people);
                $scope.suplinename = res.data.Support.map(ss => ss.type_people);
                $scope.acalinename = res.data.Acadamic.map(ss => ss.type_people);
                $scope.acadepthname = res.data.Acadamic.map(ss => ss.dept_name_th);
                $scope.supdepthname = res.data.Support.map(ss => ss.dept_name_th);

                $scope.Chartstaffdistfac();
                $scope.Chartstaff();
            },
            function (error) {
                console.log(error);
            }
        )

        $scope.Chartstaffdistfac = function () {

            var datadistfac = {
                labels: $scope.acadepthnamedistfac,
                datasets: [{
                        label: 'สายสนับสนุน',
                        data: $scope.supportstaffdistfac,
                        backgroundColor: "#AF69EF",
                        // borderColor: "#A32CC4",
                    },
                    {
                        label: 'สายวิชาการ',
                        data: $scope.acadamicstaffdistfac,
                        backgroundColor: "#710193",
                        // borderColor: "#A32CC4",
                    },
                ],
            };

            $(document).ready(
                function () {
                    var canvas = document.getElementById("Chartstaffdistfac");
                    var ctx = canvas.getContext("2d");
                    var myNewChart = new Chart(ctx, {
                        type: 'bar',
                        data: datadistfac,
                        options: {
                            plugins: {
                                datalabels: {
                                    // anchor: 'end',                                    
                                    // align: 'start',
                                    color: 'white',
                                    labels: {
                                        title: {
                                            font: {
                                                weight: 'bold'
                                            }
                                        },
                                    },
                                }
                            },
                            scales: {
                                xAxes: [{
                                    stacked: true,
                                    gridLines: {
                                        display: false,
                                    }
                                }],
                                yAxes: [{
                                    stacked: true,
                                    ticks: {
                                        beginAtZero: true,
                                    },
                                    type: 'linear',
                                }]
                            },
                        }
                    }, );
                }
            );
        }

        $scope.Chartstaff = function () {

            var datadistfac = {
                labels: $scope.supdepthname,
                datasets: [{
                        label: 'สายสนับสนุน',
                        data: $scope.supportstaff,
                        backgroundColor: "#AF69EF",
                        // borderColor: "#A32CC4",
                    },
                    {
                        label: 'สายวิชาการ',
                        data: $scope.acadamicstaff,
                        backgroundColor: "#710193",
                        // borderColor: "#A32CC4",
                    },
                ],
            };

            $(document).ready(
                function () {
                    var canvas = document.getElementById("Chartstaff");
                    var ctx = canvas.getContext("2d");
                    var myNewChart = new Chart(ctx, {
                        type: 'bar',
                        data: datadistfac,
                        options: {
                            plugins: {
                                datalabels: {
                                    // anchor: 'end',                                    
                                    // align: 'start',
                                    color: 'white',
                                    labels: {
                                        title: {
                                            font: {
                                                weight: 'bold'
                                            }
                                        },
                                    },
                                }
                            },
                            scales: {
                                xAxes: [{
                                    stacked: true,
                                    gridLines: {
                                        display: false,
                                    }
                                }],
                                yAxes: [{
                                    stacked: true,
                                    ticks: {
                                        beginAtZero: true,
                                    },
                                    type: 'linear',
                                }],

                            },
                        }

                    }, );
                }
            );
        }


    })
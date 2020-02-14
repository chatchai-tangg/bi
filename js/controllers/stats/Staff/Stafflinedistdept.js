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
                $scope.supportstaffdistfac = res.data.Supportdistfac.map(ss => ss.num);
                $scope.acadamicstaffdistfac = res.data.Acadamicdistfac.map(ss => ss.num);
                $scope.suplinenamedistfac = res.data.Supportdistfac.map(ss => ss.type_people);
                $scope.acalinenamedistfac = res.data.Acadamicdistfac.map(ss => ss.type_people);
                $scope.acadepthnamedistfac = res.data.Acadamicdistfac.map(ss => ss.dept_name_th);
                $scope.supdepthnamedistfac = res.data.Supportdistfac.map(ss => ss.dept_name_th);

                $scope.supportstaff = res.data.Acadamic.map(ss => ss.num);
                $scope.acadamicstaff = res.data.Support.map(ss => ss.num);
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
                        backgroundColor: "rgb(178,255,102,0.8)",
                        borderColor: "#B2FF66",
                    },
                    {
                        label: 'สายวิชาการ',
                        data: $scope.acadamicstaffdistfac,
                        backgroundColor: "rgb(255,0,0,0.5)",
                        borderColor: "#CC0000",
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
                        backgroundColor: "rgb(178,255,102,0.8)",
                        borderColor: "#B2FF66",
                    },
                    {
                        label: 'สายวิชาการ',
                        data: $scope.acadamicstaff,
                        backgroundColor: "rgb(255,0,0,0.5)",
                        borderColor: "#CC0000",
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
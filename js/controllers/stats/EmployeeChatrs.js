angular.module('app')

    .controller('StatsCtrl', function ($scope, $rootScope, $http) {

        $rootScope.pageTitle = 'BI Jub Jub'
        $scope.datachartsEmptype = [];
        $scope.datachartsEmpedu = [];
        $scope.menu = [];


        $scope.getdataemptype = function () {
            $http({
                url: 'http://app.rmutp.ac.th/api/bi/hrm/Employeetype',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.datachartsEmptype = res.data;
                    $scope.lables = res.data.map(res => res.et_name);
                    $scope.totals = res.data.map(res => res.Total);
                    console.log($scope.lables);
                    console.log($scope.totals);
                    $scope.chartsemptype();
                },
                function (error) {
                    console.log(error);
                }
            )
        }

        $scope.getdataempeducation = function () {
            $http({
                url: 'http://app.rmutp.ac.th/api/bi/hrm/employeeeducation',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.datachartsEmpedu = res.data;
                    $scope.dlname = res.data.map(res => res.dl_name_th);
                    $scope.degreetotals = res.data.map(res => res.degreeclass);
                    console.log($scope.dlname);
                    console.log($scope.degreetotals);
                    $scope.chartsempeducation();
                },
                function (error) {
                    console.log(error);
                }
            )
        }

        $scope.chartsemptype = function () {
            new Chart(document.getElementById("chartsemptype"), {
                type: 'pie',
                data: {
                    labels: $scope.lables,
                    datasets: [{
                        label: "บุคลากรแบ่งแยกตามประเภท",
                        backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                        data: $scope.totals
                    }]
                },
                options: {
                    legend: {
                        display: true,
                        position: 'left',
                        itemMaxWidth: 10,
                        itemWrap: true,
                        labels: {
                            boxWidth: 20,
                            boxHeight: 2,
                            itemMaxWidth: 200,
                            itemWrap: true
                        },
                    },

                    title: {
                        display: false,
                        text: 'บุคลากรแบ่งแยกตามประเภท'
                    }
                }
            });
        }

        $scope.chartsempeducation = function () {
            new Chart(document.getElementById("chartsempeducation"), {
                type: 'bar',
                data: {
                    labels: $scope.dlname,
                    datasets: [{
                        label: "บุคลากรแบ่งแยกตามประเภท",
                        backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                        data: $scope.degreetotals
                    }]
                },
                options: {
                    legend: {
                        display: true
                    },
                    title: {
                        display: false,
                        text: 'บุคลากรแบ่งแยกตามประเภท'
                    }
                }
            });
        }

        $scope.testt = function () {
            let chart = new CanvasJS.Chart("chartContainer", {

                animationEnabled: true,
                axisY: {
                    valueFormatString: " ",
                    tickLength: 0
                },
                axisX: {
                    valueFormatString: " ",
                    tickLength: 0
                },
                title: {
                    text: "Monthly Expense"
                },

                data: [{
                    type: "pie",
                    showInLegend: true,
                    toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
                    indexLabel: "{name} - #percent%",
                    dataPoints: [{
                            y: 450,
                            name: "Food"
                        },
                        {
                            y: 120,
                            name: "Insurance"
                        },
                        {
                            y: 300,
                            name: "Traveling"
                        },
                        {
                            y: 800,
                            name: "Housing"
                        },
                        {
                            y: 150,
                            name: "Education"
                        },
                        {
                            y: 150,
                            name: "Shopping"
                        },
                        {
                            y: 250,
                            name: "Others"
                        }
                    ]
                }]
            });

            chart.render();
        }

        $scope.getdataemptype();
        // $scope.getdataempeducation();
        $scope.testt();


    })
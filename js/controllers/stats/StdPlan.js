angular.module('app')

    .controller('StdplanCTRL', function ($scope, $rootScope, $http, $state) {

        $scope.datachartsSTD = [];

        function commaify(value) {
            var result = ('' + value).replace(/^(-?\d+)(\d{3})/, '$1,$2');
            return value == result ? result : commaify(result);
        }


        //GETDATA
        $scope.getacademicEmployeeEducation = function () {
            $http({
                url: 'https://app.rmutp.ac.th/api/bi/std/stdapplydistyear',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.datachartsSTD = res.data;
                    $scope.lbname = res.data.map(res => res.ACADYEAR);
                    $scope.totals = res.data.map(res => res.APP_NUM);
                    $scope.chartstdapplydistyear();
                },
                function (error) {
                    console.log(error);
                }
            )
        } // จำนวนนักศึกษาผู้สมัคร แยกตามปี

        $scope.getstudentdistyear2 = function () {
            $http({
                url: 'https://app.rmutp.ac.th/api/bi/std/studentdistyear2',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.datachartsSTD = res.data;
                    $scope.stdtotal2 = res.data.map(res => res.COUNTSTD);
                    $scope.termstd2 = res.data.map(res => res.SEMESTER);
                    $scope.stdyear2 = res.data.map(res => res.ACADYEAR);
                    $scope.chartstudentdistyear();
                },
                function (error) {
                    console.log(error);
                }
            )
        }

        $http({
            url: 'https://app.rmutp.ac.th/api/bi/std/debtstddislodgedistyear',
            method: 'GET',
        }).then(
            function (res) {
                $scope.datachartsSTD = res.data;
                $scope.lbnamesdebt = res.data.map(res => res.ACADYEAR);
                $scope.sumamount = res.data.map(res => res.SUMAMOUNT);
                $scope.sumbalance = res.data.map(res => res.SUMBALANCE);
                // $scope.datatestt();
            },
            function (error) {
                console.log(error);
            }
        )

        $scope.getdebtstudentdistyear = function () {
            $http({
                url: 'https://app.rmutp.ac.th/api/bi/STD/debtstudentdistyear',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.datachartsSTD = res.data;
                    $scope.year = res.data.map(res => res.ACADYEAR);
                    $scope.sumamount = res.data.map(res => res.SUM_AMOUNT);
                    $scope.chartdebtstudentdistyear();
                },
                function (error) {
                    console.log(error);
                }
            )
        }

        // $scope.getstartworksupportandacadamic = function () {
        //     $http({
        //         url: 'https://app.rmutp.ac.th/api/bi/hrm/startworksupportandacadamic',
        //         method: 'GET',
        //     }).then(
        //         function (res) {
        //             $scope.datachartsEmpedu = res.data;
        //             $scope.deptname = res.data.map(res => res.pos_linename);
        //             $scope.totals = res.data.map(res => res.people);
        //             $scope.chartstartworksupportandacadamic();
        //         },
        //         function (error) {
        //             console.log(error);
        //         }
        //     )
        // }

        $scope.getstartworksupportacadamic = function () {
            $http({
                url: 'https://app.rmutp.ac.th/api/bi/hrm/allstaffsupportacadamic',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.acapeople = res.data.Acadamic.map(ss => ss.people);
                    $scope.suppeople = res.data.Support.map(ss => ss.people);
                    $scope.suplinename = res.data.Support.map(ss => ss.pos_linename);
                    $scope.acalinename = res.data.Acadamic.map(ss => ss.pos_linename);
                    $scope.chartstartworksupportandacadamic();
                },
                function (error) {
                    console.log(error);
                }
            )
        }




        //PLOTCHARTS

        $scope.chartstudentdistyear = function () {
            var data = {
                datasets: [{
                    label: "เทอม 2",
                    data: $scope.stdtotal2,
                    backgroundColor: "rgb(132,212,133,0.8)",
                    borderColor: "#10D25C",
                    pointBackgroundColor: "#80b6f4",
                    pointRadius: 6,
                    pointBorderWidth: 10,
                    pointHoverRadius: 10,

                }, ],
                labels: $scope.stdyear2,
            };

            $(document).ready(
                function () {
                    var canvas = document.getElementById("chartstudentdistyear");
                    var ctx = canvas.getContext("2d");
                    var myNewChart = new Chart(ctx, {
                        type: 'line',
                        data: data,
                        options: {
                            plugins: {
                                datalabels: {
                                    anchor: 'end',
                                    color: 'black',
                                    align: 'start',
                                    labels: {
                                        title: {
                                            font: {
                                                weight: 'bold'
                                            }
                                        },
                                    },
                                    formatter: function (value) {
                                        return commaify(value);
                                        // return '$' + commaify(value);
                                    },
                                }
                            },
                            hover: {
                                onHover: function (e) {
                                    var point = this.getElementAtEvent(e);
                                    if (point.length) e.target.style.cursor = 'pointer';
                                    else e.target.style.cursor = 'default';
                                }
                            },
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        min: 0,
                                        max: 15000,
                                        stepSize: 2500
                                    },
                                }]
                            }
                        }
                    });


                    canvas.onclick = function (evt) {
                        var activePoints = myNewChart.getElementsAtEvent(evt);
                        if (activePoints[0]) {
                            var chartData = activePoints[0]['_chart'].config.data;
                            var idx = activePoints[0]['_index'];

                            var label = chartData.labels[idx];
                            var value = chartData.datasets[0].data[idx];
                            // var url = "http://example.com/?label=" + label + "&value=" + value;
                            console.log(chartData);
                            console.log(label);

                            $state.go('main.mainstats.student', {
                                id: label
                            });
                        }
                    };
                }
            );
        }

        $scope.chartdebtstddistyear = function () {
            var data = {
                labels: $scope.lbnamesdebt,
                datasets: [{
                    label: "เงินลงทะเบียนทั้งสิ้น",
                    data: $scope.sumamount,
                    backgroundColor: "rgb(178,255,102,0.8)",
                    borderColor: "#B2FF66",
                }, {
                    label: "ค้างชำระ",
                    data: $scope.sumbalance,
                    backgroundColor: "rgb(255,0,0,0.5)",
                    borderColor: "#CC0000",
                }, ],
            };

            $(document).ready(
                function () {
                    var canvas = document.getElementById("chartdebtstddistyear");
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
                                    anchor: 'center',
                                    color: 'black',
                                    align: 'end',
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
                    });



                    canvas.onclick = function (evt) {
                        var element = myNewChart.getElementsAtEvent(evt);
                        if (element[0]) {
                            var dataset = myNewChart.getDatasetAtEvent(evt);
                            // console.log(element);
                            // console.log(dataset);
                            var index = element[0]['_index'];
                            var dsIndex = dataset[0]['_datasetIndex'];
                            var chartData = element[dsIndex]['_chart'].config.data.datasets[dsIndex];
                            // console.log(chartData);
                            // console.log(index);
                            var label = element[dsIndex]['_chart'].config.data.labels[index];
                            var subLabel = chartData.label;
                            var data = chartData.data[index];
                            console.log('label : ' + label);
                            console.log('subLabel : ' + subLabel);
                            console.log('data : ' + data);
                            // $state.go('main.mainstats.student', {
                            //     id: label
                            // });
                        }
                    };
                }
            );

        }

        $scope.chartstdapplydistyear = function () {

            var data = {
                datasets: [{
                    label: "จำนวนผู้สมัครนักศึกษา",
                    data: $scope.totals,
                    borderColor: "#652d91",
                    backgroundColor: "rgb(168,140,226,0.8)",
                    pointBackgroundColor: "#FF4600",
                    pointHoverBackgroundColor: '#D2A5EE',
                    pointHoverBorderColor: '#D2A5EE',
                    pointRadius: 6,
                    pointBorderWidth: 0,
                    pointHoverRadius: 0,

                }, ],
                labels: $scope.lbname,
            };



            $(document).ready(
                function () {
                    var canvas = document.getElementById("chartstdapplydistyear");
                    var ctx = canvas.getContext("2d");
                    var myNewChart = new Chart(ctx, {
                        type: 'line',
                        data: data,
                        options: {
                            plugins: {
                                datalabels: {
                                    anchor: 'start',
                                    color: 'black',
                                    align: 'end',
                                    labels: {
                                        title: {
                                            font: {
                                                weight: 'bold'
                                            }
                                        },
                                    },
                                    formatter: function (value) {
                                        return commaify(value);
                                        // return '$' + commaify(value);
                                    },
                                }
                            },
                            hover: {
                                onHover: function (e) {
                                    var point = this.getElementAtEvent(e);
                                    if (point.length) e.target.style.cursor = 'pointer';
                                    else e.target.style.cursor = 'default';
                                }
                            },
                        }
                    });


                    canvas.onclick = function (evt) {
                        var activePoints = myNewChart.getElementsAtEvent(evt);
                        if (activePoints[0]) {
                            var chartData = activePoints[0]['_chart'].config.data;
                            var idx = activePoints[0]['_index'];

                            var label = chartData.labels[idx];
                            var value = chartData.datasets[0].data[idx];
                            var url = "http://example.com/?label=" + label + "&value=" + value;
                            console.log(chartData);
                            console.log(label);

                            $state.go('main.mainstats.studentapply', {
                                id: label
                            });
                        }
                    };
                }
            );
        }

        $scope.chartdebtstudentdistyear = function () {
            var data = {
                labels: $scope.year,
                datasets: [{
                    label: "เงินลงทะเบียน",
                    data: $scope.sumamount,
                    backgroundColor: "rgb(178,255,102,0.8)",
                    borderColor: "#B2FF66",
                }, ],
            };

            $(document).ready(
                function () {
                    var canvas = document.getElementById("chartdebtstudentdistyear");
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
                                    anchor: 'center',
                                    color: 'black',
                                    align: 'end',
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
                    });

                    canvas.onclick = function (evt) {
                        var element = myNewChart.getElementsAtEvent(evt);
                        if (element[0]) {
                            var dataset = myNewChart.getDatasetAtEvent(evt);
                            // console.log(element);
                            // console.log(dataset);
                            var index = element[0]['_index'];
                            var dsIndex = dataset[0]['_datasetIndex'];
                            var chartData = element[dsIndex]['_chart'].config.data.datasets[dsIndex];
                            // console.log(chartData);
                            // console.log(index);
                            var label = element[dsIndex]['_chart'].config.data.labels[index];
                            var subLabel = chartData.label;
                            var data = chartData.data[index];
                            // console.log('label : ' + label);
                            // console.log('subLabel : ' + subLabel);
                            // console.log('data : ' + data);
                            $state.go('main.mainstats.studentdebtregis', {
                                id: label
                            });
                        }
                    };
                }
            );

        }

        $scope.chartstartworksupportandacadamic = function () {

            var data = {
                labels: ['ประเภทบุคลากร'],
                datasets: [{
                        label: $scope.acalinename,
                        data: $scope.acapeople,
                        backgroundColor: "rgb(255,0,0,0.5)",
                        borderColor: "#CC0000",
                    }, {
                        label: $scope.suplinename,
                        data: $scope.suppeople,
                        backgroundColor: "rgb(178,255,102,0.8)",
                        borderColor: "#B2FF66",
                    },

                ],
            };


            var canvas = document.getElementById("chartstartworksupportandacadamic");
            var ctx = canvas.getContext("2d");
            console.log(canvas);
            var myNewChart = new Chart(ctx, {
                type: 'bar',
                data: data,
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
                    plugins: {
                        datalabels: {
                            formatter: (value, ctx) => {
                                var datasets = ctx.chart.data.datasets.filter(ds => {
                                    return !ds._meta[ctx.chart.id].hidden
                                    console.log(ctx.chart.data.datasets);
                                });

                                // console.log('ctx :', ctx);
                                // console.log('ctx.chart.data :', ctx.chart.data);

                                if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
                                    var sum = 0;
                                    datasets.map(dataset => {
                                        sum += dataset.data[ctx.dataIndex];
                                    });
                                    return (commaify(sum));
                                    // return commaify(sum.toLocaleString('fr-FR', {}));

                                } else {
                                    return '';
                                }
                            },
                            anchor: 'end',
                            align: 'end'
                        }
                    }

                }
            });

            canvas.onclick = function (evt) {
                var element = myNewChart.getElementsAtEvent(evt);
                if (element[0]) {
                    var dataset = myNewChart.getDatasetAtEvent(evt);
                    var index = element[0]['_index'];
                    var dsIndex = dataset[0]['_datasetIndex'];
                    var chartData = element[dsIndex]['_chart'].config.data.datasets[dsIndex];
                    var label = element[dsIndex]['_chart'].config.data.labels[index];
                    var subLabel = chartData.label;
                    var data = chartData.data[index];
                    // console.log('label : ' + label);
                    // console.log('subLabel : ' + subLabel);
                    // console.log('data : ' + data);
                    $state.go('main.mainstats.Staffline', {
                        id: subLabel
                    });
                }
            };
        }




        // execute
        $scope.getacademicEmployeeEducation();

        $scope.getdebtstudentdistyear();
        // $scope.getstudentdistyear1();
        $scope.getstudentdistyear2();
        // $scope.getstudentdistyear3();
        // $scope.getstartworksupportandacadamic();
        $scope.getstartworksupportacadamic();



        // res.data.Academic.map(function(a, b){
        //     return a.people;
        // });


    })
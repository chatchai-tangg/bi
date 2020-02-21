angular.module('app')

    .controller('FaqCTRL', function ($scope, $rootScope, $http, $state) {

        $scope.datachartsSTD = [];

        function commaify(value) {
            var result = ('' + value).replace(/^(-?\d+)(\d{3})/, '$1,$2');
            return value == result ? result : commaify(result);
        }


        Chart.pluginService.register({
            beforeDraw: function (chart) {
                if (chart.config.options.elements.center) {
                    //Get ctx from string
                    var ctx = chart.chart.ctx;

                    //Get options from the center object in options
                    var centerConfig = chart.config.options.elements.center;
                    var fontStyle = centerConfig.fontStyle || 'Arial';
                    var txt = centerConfig.text;
                    var color = centerConfig.color || '#000';
                    var sidePadding = centerConfig.sidePadding || 20;
                    var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
                    //Start with a base font of 30px
                    ctx.font = "30px " + fontStyle;

                    //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
                    var stringWidth = ctx.measureText(txt).width;
                    var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

                    // Find out how much the font can grow in width.
                    var widthRatio = elementWidth / stringWidth;
                    var newFontSize = Math.floor(30 * widthRatio);
                    var elementHeight = (chart.innerRadius * 2);

                    // Pick a new font size so it will not be larger than the height of label.
                    var fontSizeToUse = Math.min(newFontSize, elementHeight);

                    //Set font settings to draw it correctly.
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
                    var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
                    ctx.font = fontSizeToUse + "px " + fontStyle;
                    ctx.fillStyle = color;

                    //Draw text in center
                    ctx.fillText(txt, centerX, centerY);
                }
            }
        });


        //GETDATA
        $scope.getacademicEmployeeEducation = function () {
            $http({
                url: 'https://app.rmutp.ac.th/api/bi/std/stdapplydistyear',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.datachartsSTD = res.data;
                    $scope.stdyear = res.data.map(res => res.ACADYEAR);
                    $scope.totals = res.data.map(res => res.COUNT_APPLICANTID);
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
                    $scope.acadyear = res.data.map(res => res.ACADYEAR);
                    $scope.countstd = res.data.map(res => res.SUMSTD);
                    $scope.chartstudentdistyear();
                },
                function (error) {
                    console.log(error);
                }
            )
        }

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

        $scope.getbalancestudentdistyear = function () {
            $http({
                url: 'https://app.rmutp.ac.th/api/bi/STD/balancestudentdistyear',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.datachartsSTD = res.data;
                    $scope.year = res.data.map(res => res.ACADYEAR);
                    $scope.sumamount = res.data.map(res => res.BALANCE);
                    $scope.chartbalancestudentdistyear();
                },
                function (error) {
                    console.log(error);
                }
            )
        }

        $scope.getstartworksupportacadamic = function () {
            $http({
                url: 'https://app.rmutp.ac.th/api/bi/hrm/startworksupportandacadamic',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.staffpeople = res.data.map(ss => ss.people);
                    $scope.stafflinename = res.data.map(ss => ss.pos_linename);
                    $scope.chartstartworksupportandacadamic();
                },
                function (error) {
                    console.log(error);
                }
            )
        }

        $scope.getresourcebudgets = function () {
            $http({
                url: 'https://app.rmutp.ac.th/api/bi/hrm/ResourceBudget',
                method: 'GET',
            }).then(
                function (res) {
                    // $scope.years = res.data.budget01.map(ss => ss.years);
                    $scope.resourcename01 = res.data.budget01.map(ss => ss.resource_name);
                    $scope.resourcebudget01 = res.data.budget01.map(ss => ss.butgets);

                    $scope.resourcename02 = res.data.budget02.map(ss => ss.resource_name);
                    $scope.resourcebudget02 = res.data.budget02.map(ss => ss.butgets);

                    $scope.resourcename03 = res.data.budget03.map(ss => ss.resource_name);
                    $scope.resourcebudget03 = res.data.budget03.map(ss => ss.butgets);

                    console.log(res.data.budget01);
                    console.log($scope.resourcebudget01);
                    console.log(res.data.budget02);
                    console.log($scope.resourcebudget02);
                    console.log(res.data.budget03);
                    console.log($scope.resourcebudget03);
                    $scope.chartresourcebudget();
                },
                function (error) {
                    console.log(error);
                }
            )
        }

        //PLOTCHARTS

        $scope.chartstdapplydistyear = function () {

            var data = {
                datasets: [{
                    label: "จำนวนผู้สมัคร",
                    data: $scope.totals,
                    borderColor: "#652d91",
                    backgroundColor: "rgb(168,140,226,0.8)",
                    pointBackgroundColor: "#AF69EF",
                    hoverBackgroundColor: "#A1045A",
                    pointRadius: 10,
                    pointBorderWidth: 0,
                    pointHoverRadius: 10,

                }, ],
                labels: $scope.stdyear,
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
                            // console.log(chartData);
                            // console.log(label);

                            $state.go('main.bi.StudentReport1', {
                                id: label
                            });
                        }
                    };
                }
            );
        }

        $scope.chartstudentdistyear = function () {
            var data = {
                datasets: [{
                    label: "จำนวนนักศึกษา",
                    data: $scope.countstd,
                    backgroundColor: "rgb(0,142,204,0.8)",
                    borderColor: "rgb(16,52,166)",
                    pointBackgroundColor: "#0F52BA",
                    hoverBackgroundColor: "#A1045A",
                    pointRadius: 10,
                    pointBorderWidth: 0,
                    pointHoverRadius: 10,
                }, ],
                labels: $scope.acadyear,
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
                            // console.log(chartData);
                            // console.log(label);

                            $state.go('main.bi.StudentReport2', {
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
                    label: "จำนวนเงินค่าลงทะเบียน",
                    data: $scope.sumamount,
                    backgroundColor: "rgb(80,200,120,0.8)",
                    borderColor: "#2E8B57",
                    pointBackgroundColor: "#00A572",
                    hoverBackgroundColor: "#A1045A",
                    pointRadius: 10,
                    pointBorderWidth: 0,
                    pointHoverRadius: 10,
                }, ],
            };

            $(document).ready(
                function () {
                    var canvas = document.getElementById("chartdebtstudentdistyear");
                    var ctx = canvas.getContext("2d");
                    var myNewChart = new Chart(ctx, {
                        type: 'line',
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
                                        // min: 0,
                                        max: 400000000,
                                        // stepSize: 2500,
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
                            $state.go('main.bi.StudentReport3', {
                                id: label
                            });
                        }
                    };
                }
            );

        }

        $scope.chartbalancestudentdistyear = function () {
            var data = {
                labels: $scope.year,
                datasets: [{
                    label: "จำนวนเงินค้างชำระ",
                    data: $scope.sumamount,
                    backgroundColor: "rgb(234,60,83,0.8)",
                    borderColor: "#ED2939",
                    pointBackgroundColor: "#ED2939",
                    hoverBackgroundColor: "#E36FF6",
                    pointRadius: 10,
                    pointBorderWidth: 0,
                    pointHoverRadius: 10,
                }, ],
            };

            $(document).ready(
                function () {
                    var canvas = document.getElementById("chartbalancestudentdistyear");
                    var ctx = canvas.getContext("2d");
                    var myNewChart = new Chart(ctx, {
                        type: 'line',
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
                            $state.go('main.bi.StudentReport4', {
                                id: label
                            });
                        }
                    };
                }
            );

        }

        $scope.chartstartworksupportandacadamic = function () {

            var data = {
                labels: $scope.stafflinename,
                datasets: [{
                        label: $scope.stafflinename,
                        data: $scope.staffpeople,
                        backgroundColor: ["#710193", "#AF69EF"],
                        borderColor: "#A32CC4",
                    },
                    // {
                    //     label: $scope.suplinename,
                    //     data: $scope.suppeople,
                    //     backgroundColor: "#AF69EF",
                    //     borderColor: "#A32CC4",
                    // },
                ],
            };

            var a = $scope.staffpeople[0];
            var b = $scope.staffpeople[1];
            var c = a + b;
            console.log(c);

            var canvas = document.getElementById("chartstartworksupportandacadamic");
            var ctx = canvas.getContext("2d");
            var myNewChart = new Chart(ctx, {
                type: 'doughnut',
                data: data,
                options: {
                    plugins: {
                        datalabels: {
                            formatter: (value, ctx) => {
                                let sum = 0;
                                let dataArr = ctx.chart.data.datasets[0].data;
                                dataArr.map(data => {
                                    sum += data;
                                });
                                let percentage = (value * 100 / sum).toFixed(0) + "%";
                                return percentage;
                            },
                            // anchor: 'end',
                            // align: 'end',
                            color: 'white',
                            labels: {
                                title: {
                                    font: {
                                        weight: 'bold'

                                    }
                                },
                            },
                        },
                    },
                    elements: {
                        center: {
                            text: 'รวม ' + (commaify(c)) + ' คน',
                            color: 'black', // Default is #000000
                            fontStyle: 'Arial', // Default is Arial
                            sidePadding: 35 // Defualt is 20 (as a percentage)
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
                    $state.go('main.bi.StaffReport1', {
                        id: subLabel
                    });
                }
            };
        }

        $scope.chartresourcebudget = function () {

            var years = ['2559', '2560', '2561', '2562', '2563'];
            var data = {
                labels: years,
                datasets: [{
                        label: 'เงินงบประมาณ',
                        data: $scope.resourcebudget01,
                        // borderColor: "#652d91",
                        backgroundColor: "rgb(255,127,0,0.8)",
                    },
                    {
                        label: 'เงินรายได้',
                        data: $scope.resourcebudget02,
                        // borderColor: "#652d91",
                        backgroundColor: "rgb(255,255,0,0.8)",
                    },
                    {
                        label: 'เงินนอก อื่น ๆ',
                        data: $scope.resourcebudget03,
                        // borderColor: "#652d91",
                        backgroundColor: "rgb(255,43,0,0.8)",
                    },
                ],

            };

            $(document).ready(
                function () {
                    var canvas = document.getElementById("chartresourcebudget");
                    var ctx = canvas.getContext("2d");
                    var myNewChart = new Chart(ctx, {
                        type: 'bar',
                        data: data,
                        options: {
                            responsive: true,
                            scales: {
                                xAxes: [{
                                    stacked: true,
                                }],
                                yAxes: [{
                                    stacked: true,
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
                            plugins: {
                                datalabels: {
                                    anchor: 'center',
                                    align: 'center',
                                    color: 'black',
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
                            tooltips: {
                                mode: 'index',
                                intersect: false,
                                callbacks: {
                                    label: function (tooltipItem, data) {
                                        var label = data.datasets[tooltipItem.datasetIndex].label;
                                        data.datasets[tooltipItem.datasetIndex].label;
                                        return label + ' ' + tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " บาท";
                                    },
                                    // label: function (tooltipItem, data, ) {
                                    //     console.log(tooltipItem);
                                    //     console.log(data);
                                    //     return tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " บาท";
                                    // },
                                },
                            },
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
                            console.log('label : ' + label);
                            console.log('subLabel : ' + subLabel);
                            console.log('data : ' + data);

                            // $state.go('main.bi.StudentReport1', {
                            //     id: label
                            // });
                        }
                    };
                }
            );
        }

        // execute
        $scope.getacademicEmployeeEducation();
        $scope.getdebtstudentdistyear();
        // $scope.getstudentdistyear1();
        $scope.getstudentdistyear2();
        // $scope.getstudentdistyear3();
        // $scope.getstartworksupportandacadamic();
        $scope.getstartworksupportacadamic();
        $scope.getbalancestudentdistyear();
        $scope.getresourcebudgets();



        // res.data.Academic.map(function(a, b){
        //     return a.people;
        // });


    })
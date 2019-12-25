angular.module('app')

    .controller('StddetailsCTRL', function ($scope, $rootScope, $http) {

        $scope.datachartsSTD = [];

        function commaify(value) {
            var result = ('' + value).replace(/^(-?\d+)(\d{3})/, '$1,$2');
            return value == result ? result : commaify(result);
        }


        //GETDATA
        $scope.getacademicEmployeeEducation = function () {
            $http({
                url: 'http://app.rmutp.ac.th/api/bi/std/stdapplydistyear',
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

        $scope.getstdnormaldisttypeyear = function () {
            $http({
                url: 'http://app.rmutp.ac.th/api/bi/std/stdnormaldisttypeyear',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.datachartsSTD = res.data;
                    $scope.lbnamenormal = res.data.map(res => res.ADMITACADYEAR);
                    $scope.totalsnormal = res.data.map(res => res.CS);
                    $scope.chartstddistyeartype();
                },
                function (error) {
                    console.log(error);
                }
            )
        } //จำนวนนักศึกษา จำแนกตามสถานะ (ปกติ)

        $scope.getstdtakeleavedisttypeyear = function () {
            $http({
                url: 'http://app.rmutp.ac.th/api/bi/std/stdtakeleavedisttypeyear',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.datachartsSTD = res.data;
                    $scope.lbnametakeleave = res.data.map(res => res.ADMITACADYEAR);
                    $scope.totalstakeleave = res.data.map(res => res.CS);
                    $scope.chartstddistyeartype();
                },
                function (error) {
                    console.log(error);
                }
            )
        } //จำนวนนักศึกษา จำแนกตามสถานะ (ลาพักการศึกษา)

        $scope.getstdresigndisttypeyear = function () {
            $http({
                url: 'http://app.rmutp.ac.th/api/bi/std/stdresigndisttypeyear',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.datachartsSTD = res.data;
                    $scope.lbnameresign = res.data.map(res => res.ADMITACADYEAR);
                    $scope.totalsresign = res.data.map(res => res.CS);
                    $scope.chartstddistyeartype();
                },
                function (error) {
                    console.log(error);
                }
            )
        } //จำนวนนักศึกษา จำแนกตามสถานะ (ลาออก)

        $scope.getstddislodgedisttypeyear = function () {
            $http({
                url: 'http://app.rmutp.ac.th/api/bi/std/stddislodgedisttypeyear',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.datachartsSTD = res.data;
                    $scope.lbnamedislodge = res.data.map(res => res.ADMITACADYEAR);
                    $scope.totalsdislodge = res.data.map(res => res.CS);
                    $scope.chartstddistyeartype();
                },
                function (error) {
                    console.log(error);
                }
            )
        } //จำนวนนักศึกษา จำแนกตามสถานะ (พ้นสภาพ)

        $scope.getadviserdistyearterm1 = function () {
            $http({
                url: 'http://app.rmutp.ac.th/api/bi/std/adviserdistyearterm1',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.datachartsSTD = res.data;
                    $scope.lbnameadviser1 = res.data.map(res => res.YEARANDTERM);
                    $scope.totalsadviser1 = res.data.map(res => res.Count_OFFICERID);
                    $scope.chartadviserdistyearterm();
                },
                function (error) {
                    console.log(error);
                }
            )
        }

        $scope.getadviserdistyearterm2 = function () {
            $http({
                url: 'http://app.rmutp.ac.th/api/bi/std/adviserdistyearterm2',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.datachartsSTD = res.data;
                    // $scope.lbnameadviser2 = res.data.map(res => res.YEARANDTERM);
                    $scope.totalsadviser2 = res.data.map(res => res.Count_OFFICERID);
                    $scope.chartadviserdistyearterm();
                },
                function (error) {
                    console.log(error);
                }
            )
        }

        $scope.getadviserdistyearterm3 = function () {
            $http({
                url: 'http://app.rmutp.ac.th/api/bi/std/adviserdistyearterm3',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.datachartsSTD = res.data;
                    // $scope.lbnameadviser3 = res.data.map(res => res.YEARANDTERM);
                    $scope.totalsadviser3 = res.data.map(res => res.Count_OFFICERID);
                    $scope.chartadviserdistyearterm();
                },
                function (error) {
                    console.log(error);
                }
            )
        }

        $scope.getscholardistyear59 = function () {
            $http({
                url: 'http://app.rmutp.ac.th/api/bi/std/scholardistyear59',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.datachartsSTD = res.data;
                    $scope.lbnamescholar59 = res.data.map(res => res.TYPE);
                    $scope.totalsscholar59 = res.data.map(res => res.Count_STUDENTID);

                    $scope.chartscholardistyear();
                },
                function (error) {
                    console.log(error);
                }
            )
        }

        $scope.getscholardistyear60 = function () {
            $http({
                url: 'http://app.rmutp.ac.th/api/bi/std/scholardistyear60',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.datachartsSTD = res.data;
                    $scope.lbnamescholar60 = res.data.map(res => res.TYPE);
                    $scope.totalsscholar60 = res.data.map(res => res.Count_STUDENTID);
                    $scope.chartscholardistyear();
                },
                function (error) {
                    console.log(error);
                }
            )
        }

        $scope.getscholardistyear61 = function () {
            $http({
                url: 'http://app.rmutp.ac.th/api/bi/std/scholardistyear61',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.datachartsSTD = res.data;
                    $scope.lbnamescholar61 = res.data.map(res => res.TYPE);
                    $scope.totalsscholar61 = res.data.map(res => res.Count_STUDENTID);
                    $scope.chartscholardistyear();
                },
                function (error) {
                    console.log(error);
                }
            )
        }

        $scope.getscholardistyear62 = function () {
            $http({
                url: 'http://app.rmutp.ac.th/api/bi/std/scholardistyear62',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.datachartsSTD = res.data;
                    $scope.lbnamescholar62 = res.data.map(res => res.TYPE);
                    $scope.totalsscholar62 = res.data.map(res => res.Count_STUDENTID);
                    $scope.chartscholardistyear();
                },
                function (error) {
                    console.log(error);
                }
            )
        }

        $scope.getdebtstddislodgedistyear = function () {
            $http({
                url: 'http://app.rmutp.ac.th/api/bi/std/debtstddislodgedistyear',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.datachartsSTD = res.data;
                    $scope.lbnamesdebt = res.data.map(res => res.ACADYEAR);
                    $scope.sumamount = res.data.map(res => res.SUMAMOUNT);
                    $scope.sumbalance = res.data.map(res => res.SUMBALANCE);
                    $scope.chartdebtstddistyear();
                },
                function (error) {
                    console.log(error);
                }
            )
        }

        $scope.getdebtstdresigndistyear = function () {
            $http({
                url: 'http://app.rmutp.ac.th/api/bi/std/debtstdresigndistyear',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.datachartsSTD = res.data;
                    $scope.lbnamesdebtresign = res.data.map(res => res.ACADYEAR);
                    $scope.totalsdebtresign = res.data.map(res => res.SUMBALANCE);

                    $scope.chartdebtstddistyear();
                },
                function (error) {
                    console.log(error);
                }
            )
        }

        $scope.getdebtstdnormaldistyear = function () {
            $http({
                url: 'http://app.rmutp.ac.th/api/bi/std/debtstdnormaldistyear',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.datachartsSTD = res.data;
                    $scope.lbnamesdebtnormal = res.data.map(res => res.ACADYEAR);
                    $scope.totalsdebtnormal = res.data.map(res => res.SUMBALANCE);

                    $scope.chartdebtstddistyear();
                },
                function (error) {
                    console.log(error);
                }
            )
        }

        $scope.getcoursesdistsciencesocial = function () {
            $http({
                url: 'http://app.rmutp.ac.th/api/bi/std/coursesdistsciencesocial',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.datachartsSTD = res.data;
                    $scope.lbnamecourse = res.data.map(res => res.TYPE);
                    $scope.totalscourse = res.data.map(res => res.CURNAME);

                    $scope.chartcoursesdistsciencesocial();
                },
                function (error) {
                    console.log(error);
                }
            )
        }

        $scope.getdeptscholardisttype = function () {
            $http({
                url: 'http://app.rmutp.ac.th/api/bi/std/deptscholardisttype',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.datachartsSTD = res.data;
                    $scope.stdtype = res.data.map(res => res.TYPE);
                    $scope.stdtotalscholar = res.data.map(res => res.COUNTS);
                    $scope.sumtotalscholar = res.data.map(res => res.SUMBALANCE);
                    $scope.sumyear = res.data.map(res => res.ACADYEAR);
                    $scope.chartdeptscholardisttype();
                },
                function (error) {
                    console.log(error);
                }
            )
        } // จำนวนผู้รับทุน กยศ.กรอ และจำนวนเงินที่ได้รับ

        $scope.getdeptscholarrmutpdisttype59 = function () {
            $http({
                url: 'http://app.rmutp.ac.th/api/bi/std/deptscholarrmutpdisttype59',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.datachartsSTD = res.data;
                    $scope.stdtype = res.data.map(res => res.SCHOLAR);
                    $scope.stdtotalscholarrmutp59 = res.data.map(res => res.COUNTS);
                    $scope.sumtotalscholarrmutp59 = res.data.map(res => res.SUMBALANCE);
                    $scope.sumyear = res.data.map(res => res.ACADYEAR);
                    $scope.chartdeptscholarrmutpdisttype();

                    console.log($scope.sumtotalscholarrmutp59);

                },
                function (error) {
                    console.log(error);
                }
            )
        } // จำนวนผู้รับทุนราชมงคล และจำนวนเงินที่ได้รับ

        $scope.getdeptscholarrmutpdisttype60 = function () {
            $http({
                url: 'http://app.rmutp.ac.th/api/bi/std/deptscholarrmutpdisttype60',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.datachartsSTD = res.data;
                    $scope.stdtype = res.data.map(res => res.SCHOLAR);
                    $scope.stdtotalscholarrmutp60 = res.data.map(res => res.COUNTS);
                    $scope.sumtotalscholarrmutp60 = res.data.map(res => res.SUMBALANCE);
                    $scope.sumyear = res.data.map(res => res.ACADYEAR);
                    $scope.chartdeptscholarrmutpdisttype();

                    console.log($scope.sumtotalscholarrmutp60);
                },
                function (error) {
                    console.log(error);
                }
            )
        }

        $scope.getdeptscholarrmutpdisttype61 = function () {
            $http({
                url: 'http://app.rmutp.ac.th/api/bi/std/deptscholarrmutpdisttype61',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.datachartsSTD = res.data;
                    $scope.stdtype = res.data.map(res => res.SCHOLAR);
                    $scope.stdtotalscholarrmutp61 = res.data.map(res => res.COUNTS);
                    $scope.sumtotalscholarrmutp61 = res.data.map(res => res.SUMBALANCE);
                    $scope.sumyear = res.data.map(res => res.ACADYEAR);
                    $scope.chartdeptscholarrmutpdisttype();
                },
                function (error) {
                    console.log(error);
                }
            )
        }

        $scope.getdeptscholarrmutpdisttype62 = function () {
            $http({
                url: 'http://app.rmutp.ac.th/api/bi/std/deptscholarrmutpdisttype62',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.datachartsSTD = res.data;
                    $scope.stdtype = res.data.map(res => res.SCHOLAR);
                    $scope.stdtotalscholarrmutp62 = res.data.map(res => res.COUNTS);
                    $scope.sumtotalscholarrmutp62 = res.data.map(res => res.SUMBALANCE);
                    $scope.sumyear = res.data.map(res => res.ACADYEAR);
                    $scope.chartdeptscholarrmutpdisttype();
                },
                function (error) {
                    console.log(error);
                }
            )
        }

        $scope.getdeptscholaretcdisttype = function () {
            $http({
                url: 'http://app.rmutp.ac.th/api/bi/std/deptscholaretcdisttype',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.datachartsSTD = res.data;
                    $scope.stdtype = res.data.map(res => res.TYPE);
                    $scope.stdtotalscholaretc = res.data.map(res => res.Count_STUDENTID);
                    $scope.sumtotalscholaretc = res.data.map(res => res.sum_balance);
                    $scope.sumyear = res.data.map(res => res.ACADYEAR);
                    $scope.chartdeptscholardisttype();
                },
                function (error) {
                    console.log(error);
                }
            )
        }

        $scope.getstudentdistyear1 = function () {
            $http({
                url: 'http://app.rmutp.ac.th/api/bi/std/studentdistyear',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.datachartsSTD = res.data;
                    $scope.stdtotal1 = res.data.map(res => res.COUNTSTD);
                    $scope.termstd1 = res.data.map(res => res.SEMESTER);
                    $scope.stdyear1 = res.data.map(res => res.ACADYEAR);
                    $scope.chartstudentdistyear();
                },
                function (error) {
                    console.log(error);
                }
            )
        }

        $scope.getstudentdistyear2 = function () {
            $http({
                url: 'http://app.rmutp.ac.th/api/bi/std/studentdistyear2',
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

        $scope.getstudentdistyear3 = function () {
            $http({
                url: 'http://app.rmutp.ac.th/api/bi/std/studentdistyear3',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.datachartsSTD = res.data;
                    $scope.stdtotal3 = res.data.map(res => res.COUNTSTD);
                    $scope.termstd3 = res.data.map(res => res.SEMESTER);
                    $scope.stdyear3 = res.data.map(res => res.ACADYEAR);
                    $scope.chartstudentdistyear();
                },
                function (error) {
                    console.log(error);
                }
            )
        }




        //PLOTCHARTS
        $scope.chartstdapplydistyear = function () {
            new Chart(document.getElementById("chartstdapplydistyear"), {
                type: 'line',
                data: {
                    labels: $scope.lbname,
                    datasets: [{
                        label: "จำนวนผู้สมัครนักศึกษา",
                        data: $scope.totals,
                        borderColor: "#652d91",
                        backgroundColor: "rgb(168,140,226,0.8)"
                    }]
                },
                options: {
                    plugins: {
                        datalabels: {
                            anchor: 'end',
                            color: 'black',
                            labels: {
                                title: {
                                    font: {
                                        weight: 'bold'
                                    }
                                },
                            },
                            align: 'start'
                        }
                    },
                }
            });
        }

        $scope.chartadviserdistyearterm = function () {
            new Chart(document.getElementById("chartadviserdistyearterm"), {
                type: 'bar',
                data: {
                    labels: $scope.lbnameadviser1,
                    datasets: [{
                            label: "เทอม1",
                            data: $scope.totalsadviser1,
                            // borderColor: "#3e95cd",
                            fill: false
                        },
                        {
                            label: "เทอม2",
                            data: $scope.totalsadviser2,
                            // borderColor: "#8e5ea2",
                            fill: false
                        },
                        {
                            label: "เทอม3",
                            data: $scope.totalsadviser3,
                            // borderColor: "#8e5ea2",
                            fill: false
                        },
                    ]
                },
                options: {
                    plugins: {
                        colorschemes: {
                            scheme: 'brewer.SetOne8'
                        },
                        datalabels: {
                            anchor: 'start',
                            color: 'black',
                            align: 'end',
                        }
                    },
                    legend: {
                        display: true
                    },
                }
            });
        }

        $scope.chartdebtstddistyear = function () {
            new Chart(document.getElementById("chartdebtstddistyear"), {
                type: 'bar',
                data: {
                    labels: $scope.lbnamesdebt,
                    datasets: [{
                            label: "เงินลงทะเบียนทั้งสิ้น",
                            data: $scope.sumamount,
                            backgroundColor: "rgb(178,255,102,0.8)",
                            borderColor: "#B2FF66",
                            // fill: false
                        },
                        {
                            label: "ค้างชำระ",
                            data: $scope.sumbalance,
                            backgroundColor: "rgb(255,0,0,0.5)",
                            borderColor: "#CC0000",
                            // fill: false
                        },
                    ]
                },
                options: {
                    plugins: {
                        datalabels: {
                            formatter: function (value) {
                                return commaify(value);
                                // return '$' + commaify(value);
                            },
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
        }

        $scope.chartcoursesdistsciencesocial = function () {
            new Chart(document.getElementById("chartcoursesdistsciencesocial"), {
                type: 'doughnut',
                data: {
                    labels: $scope.lbnamecourse,
                    datasets: [{
                        label: "ภาควิชา",
                        data: $scope.totalscourse,
                        backgroundColor: ["#5b9dc2", "#fff100", "#3381d8"],
                        // fill: false
                    }, ]
                },
                options: {
                    plugins: {
                        datalabels: {
                            anchor: 'center',
                            color: 'black',
                            align: 'center',
                            formatter: (value, ctx) => {
                                let sum = 0;
                                let dataArr = ctx.chart.data.datasets[0].data;
                                dataArr.map(data => {
                                    sum += data;
                                });
                                let percentage = (value * 100 / sum).toFixed(0) + "%";
                                return percentage;
                            },
                        }
                    },
                    // legend: {
                    //     display: false
                    // },
                }
            });
        }

        $scope.chartdeptscholardisttype = function () {
            new Chart(document.getElementById("chartdeptscholardisttype"), {
                type: 'bar',
                data: {
                    labels: $scope.sumyear,
                    datasets: [{
                            label: "จำนวนผู้รับทุน",
                            data: $scope.stdtotalscholar,
                            backgroundColor: "rgba(178, 102, 255, 0.6)",
                            fill: false,
                            yAxisID: 'yr',
                        },
                        {
                            type: 'line',
                            label: "จำนวนเงิน",
                            data: $scope.sumtotalscholar,
                            borderColor: "#99FF33",
                            backgroundColor: "B2FF66",
                            fill: false,
                            yAxisID: 'yl',
                        },

                    ],
                },
                options: {
                    plugins: {
                        datalabels: {
                            formatter: function (value) {
                                return commaify(value);
                                // return '$' + commaify(value);
                            },
                            anchor: 'end',
                            color: 'black',
                            align: 'end',
                        }
                    },
                    scales: {
                        yAxes: [{
                                stacked: true,
                                position: "left",
                                id: "yr",
                                ticks: {
                                    // min: 0,
                                    // max: 8000,
                                    stepSize: 500
                                },
                            },

                            {
                                stacked: false,
                                position: "right",
                                id: "yl",
                                ticks: {
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
                                },
                            },

                        ],
                    }
                }
            });
        }

        $scope.chartdeptscholarrmutpdisttype = function () {
            new Chart(document.getElementById("chartdeptscholarrmutpdisttype"), {
                type: 'bar',
                data: {
                    labels: $scope.stdtype,
                    datasets: [{
                            label: 'ปีการศึกษา 2560',
                            backgroundColor: '#FF66B2',
                            data: $scope.sumtotalscholarrmutp60,
                        }, {
                            label: 'ปีการศึกษา 2561',
                            backgroundColor: '#1E90FF',
                            data: $scope.sumtotalscholarrmutp61,
                        },
                        {
                            label: 'ปีการศึกษา 2562',
                            backgroundColor: '#00CED1',
                            data: $scope.sumtotalscholarrmutp62,
                        },
                    ]
                },
                options: {
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
                            formatter: function (value) {
                                return commaify(value);
                                // return '$' + commaify(value);
                            },
                            anchor: 'start',
                            color: 'black',
                            align: 'end',
                            display: false,
                        }
                    },
                }
            });
        }

        $scope.chartstudentdistyear = function () {
            new Chart(document.getElementById("chartstudentdistyear"), {
                type: 'bar',
                data: {
                    labels: $scope.stdyear1,
                    datasets: [{
                            label: "เทอม 1",
                            data: $scope.stdtotal1,
                            borderColor: "#3e95cd",
                            fill: false
                        },
                        {
                            label: "เทอม 2",
                            data: $scope.stdtotal2,
                            // borderColor: "#c45850",
                            fill: false
                        },
                        {
                            label: "เทอม 3",
                            data: $scope.stdtotal3,
                            // borderColor: "#c45850",
                            fill: false
                        }
                    ]
                },
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
                        }
                    },
                }
            });
        }


        // execute
        $scope.getacademicEmployeeEducation();
        $scope.getadviserdistyearterm1();
        $scope.getadviserdistyearterm2();
        $scope.getadviserdistyearterm3();
        $scope.getdebtstddislodgedistyear();
        $scope.getdebtstdresigndistyear();
        $scope.getdebtstdnormaldistyear();
        $scope.getcoursesdistsciencesocial();
        $scope.getdeptscholardisttype();
        $scope.getdeptscholarrmutpdisttype59();
        $scope.getdeptscholarrmutpdisttype60();
        $scope.getdeptscholarrmutpdisttype61();
        $scope.getdeptscholarrmutpdisttype62();
        // $scope.getdeptscholaretcdisttype
        $scope.getstudentdistyear1();
        $scope.getstudentdistyear2();
        $scope.getstudentdistyear3();

    })
angular.module('app')

    .controller('StatsCtrl', function ($scope, $rootScope, $http, $state) {


        $scope.datachartsEmptype = [];
        $scope.datachartsEmpedu = [];

        // GETDATA
        $scope.getdataemptype = function () {
            $http({
                url: 'http://app.rmutp.ac.th/api/bi/hrm/Employeetype',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.datachartsEmptype = res.data;
                    $scope.lables = res.data.map(res => res.et_name);
                    $scope.totals = res.data.map(res => res.Total);
                    $scope.chartsemptype();
                },
                function (error) {
                    console.log(error);
                }
            )
        } //ประเภทบุคลากร

        $scope.getappointedexecutive62 = function () {
            $http({
                url: 'http://app.rmutp.ac.th/api/bi/hrm/appointedexecutive62',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.datachartsEmptype = res.data;
                    $scope.lables = res.data.map(res => res.pmname);
                    $scope.totals = res.data.map(res => res.manager);
                    $scope.chartappointedexecutive62();
                },
                function (error) {
                    console.log(error);
                }
            )
        } // จำนวนผู้บริหารแบบแต่งตั้ง (ขาดข้อมูลหัวหน้างานในสายสนับสนุน)

        $scope.getstaffworkdistfaculty = function () {
            $http({
                url: 'http://app.rmutp.ac.th/api/bi/hrm/staffworkdistfaculty',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.datachartsEmptype = res.data;
                    $scope.lables = res.data.map(res => res.dept_name_th);
                    $scope.totals = res.data.map(res => res.num);
                    $scope.chartstaffworkdistfaculty();
                },
                function (error) {
                    console.log(error);
                }
            )
        } //จำนวนบุคลากร จำแนกตามหน่วยงาน ปีปัจจุบัน (คณะ)

        $scope.getstaffworkdistinstitute = function () {
            $http({
                url: 'http://app.rmutp.ac.th/api/bi/hrm/staffworkdistinstitute',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.datachartsEmptype = res.data;
                    $scope.lables = res.data.map(res => res.dept_name_th);
                    $scope.totals = res.data.map(res => res.num);
                    $scope.chartstaffworkdistinstitute();
                },
                function (error) {
                    console.log(error);
                }
            )
        } //จำนวนบุคลากร จำแนกตามหน่วยงาน ปีปัจจุบัน (สำนักสถาบัน)

        $scope.getstaffworkdistdivision = function () {
            $http({
                url: 'http://app.rmutp.ac.th/api/bi/hrm/staffworkdistdivision',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.datachartsEmptype = res.data;
                    $scope.lables = res.data.map(res => res.dept_name_th);
                    $scope.totals = res.data.map(res => res.num);
                    $scope.chartstaffworkdistdivision();
                },
                function (error) {
                    console.log(error);
                }
            )
        } //จำนวนบุคลากร จำแนกตามหน่วยงาน ปีปัจจุบัน (กอง)


        // PLOTCHARTS

        $scope.chartsemptype = function () {
            new Chart(document.getElementById("chartsemptype"), {
                type: 'pie',
                data: {
                    labels: $scope.lables,
                    datasets: [{
                        label: "บุคลากรแบ่งแยกตามประเภท",
                        // backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                        data: $scope.totals
                    }]
                },
                options: {
                    plugins: {
                        colorschemes: {
                            scheme: 'brewer.SetThree6'
                        },
                        datalabels: {
                            color: 'black',
                            labels: {
                                title: {
                                    font: {
                                        fontSize: 13,
                                    }
                                },
                            },
                            formatter: (value, ctx) => {
                                let sum = 0;
                                let dataArr = ctx.chart.data.datasets[0].data;
                                dataArr.map(data => {
                                    sum += data;
                                });
                                let percentage = (value * 100 / sum).toFixed(1) + "%";
                                return percentage;
                            },
                        },
                    },
                    legend: {
                        display: true,
                        position: 'left',
                        itemWrap: true,
                        labels: {
                            boxWidth: 20,
                            boxHeight: 2,
                            itemMaxWidth: 200,
                            itemWrap: true
                        },
                    },
                }
            });

        }

        $scope.chartappointedexecutive62 = function () {
            new Chart(document.getElementById("chartappointedexecutive62"), {
                type: 'bar',
                data: {
                    labels: $scope.lables,
                    datasets: [{
                        label: "ผู้บริหารที่มาจากการสรรหา",
                        data: $scope.totals,
                        backgroundColor: '#ff9b83',
                        fill: false,
                    }]
                },
                options: {
                    plugins: {
                        colorschemes: {
                            scheme: 'brewer.Paired12'
                        },
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
                        }
                    },
                }
            });
        }

        $scope.chartstaffworkdistfaculty = function () {
            new Chart(document.getElementById("chartstaffworkdistfaculty"), {
                type: 'bar',
                data: {
                    labels: $scope.lables,
                    datasets: [{
                        label: "บุคลากรจำแนกตามคณะ",
                        data: $scope.totals,
                        backgroundColor: '#976393',
                        fill: false,
                    }]
                },
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
                        }
                    },
                }
            });
        }

        $scope.chartstaffworkdistinstitute = function () {
            new Chart(document.getElementById("chartstaffworkdistinstitute"), {
                type: 'bar',
                data: {
                    labels: $scope.lables,
                    datasets: [{
                        label: "บุคลากรจำแนกตาม สำนัก สถาบัน",
                        data: $scope.totals,
                        backgroundColor: '#FFFF00',
                        // fill: false,
                    }]
                },
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
                        }
                    },
                }
            });
        }

        $scope.chartstaffworkdistdivision = function () {
            new Chart(document.getElementById("chartstaffworkdistdivision"), {
                type: 'bar',
                data: {
                    labels: $scope.lables,
                    datasets: [{
                        label: "บุคลากรจำแนกตาม กอง",
                        data: $scope.totals,
                        backgroundColor: '#97ebdb',
                        fill: false,
                    }]
                },
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
                        }
                    },
                }
            });
        }




        //EXECUTE
        $scope.getdataemptype();
        $scope.getappointedexecutive62();
        $scope.getstaffworkdistfaculty();
        $scope.getstaffworkdistinstitute();
        $scope.getstaffworkdistdivision();


    })
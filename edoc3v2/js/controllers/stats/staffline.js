angular.module('app')

    .controller('StafflineCtrl', function ($scope, $rootScope, $http) {

        //GETDATA  

        $scope.getteacheratworkdisttype = function () {
            $http({
                url: 'https://app.rmutp.ac.th/api/bi/hrm/teacheratworkdisttype',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.datachartsEmptype = res.data;
                    $scope.lables = res.data.map(res => res.el_name);
                    $scope.totals = res.data.map(res => res.expert_num);
                    $scope.chartteacheratworkdisttype();
                },
                function (error) {
                    console.log(error);
                }
            )
        } //จำนวนอาจารย์ สายวิชาการ แยกตามตำแหน่ง  ที่ปฏิบัติงานอยู่ปัจจุบัน

        $scope.getstaffsupportlinepositiondist = function () {
            $http({
                url: 'https://app.rmutp.ac.th/api/bi/hrm/staffsupportlinepositiondist',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.datachartsEmptype = res.data;
                    $scope.lables = res.data.map(res => res.el_name);
                    $scope.totals = res.data.map(res => res.expert_num);
                    $scope.chartstaffsupportlinepositiondist();
                },
                function (error) {
                    console.log(error);
                }
            )
        } //จำนวน บุคลากรสายสนับสนุน แยกตาม ปฏิบัติการ, ชำนาญการ, ชำนาญการพิเศษ

        $scope.getacademicEmployeeEducation = function () {
            $http({
                url: 'https://app.rmutp.ac.th/api/bi/hrm/academicEmployeeEducation',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.datachartsEmpedu = res.data;
                    $scope.dlname = res.data.map(res => res.dl_name_th);
                    $scope.degreetotals = res.data.map(res => res.degreeNum);
                    $scope.chartacademicEmployeeEducation();
                },
                function (error) {
                    console.log(error);
                }
            )
        } // จำแนกบุคลากรตามการศึกษา (สายวิชาการ)

        $scope.getacademicEmployeeSupport = function () {
            $http({
                url: 'https://app.rmutp.ac.th/api/bi/hrm/academicEmployeeSupport',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.datachartsEmpedu = res.data;
                    $scope.dlname = res.data.map(res => res.dl_name_th);
                    $scope.degreetotals = res.data.map(res => res.degreeclass);
                    $scope.chartademicEmployeeSupport();
                },
                function (error) {
                    console.log(error);
                }
            )
        } // จำแนกบุคลากรตามการศึกษา (สายสนับสนุน)


        //PLOTCHARTS


        $scope.chartteacheratworkdisttype = function () {
            new Chart(document.getElementById("chartteacheratworkdisttype"), {
                type: 'doughnut',
                data: {
                    labels: $scope.lables,
                    datasets: [{
                        label: "บุคลากรแบ่งแยกตามประเภท",
                        backgroundColor: ["#02a1d8", "#db2244", "#f79005"],
                        data: $scope.totals
                    }]
                },
                options: {
                    plugins: {
                        datalabels: {
                            color: 'white',
                            formatter: (value, ctx) => {
                                let sum = 0;
                                let dataArr = ctx.chart.data.datasets[0].data;
                                dataArr.map(data => {
                                    sum += data;
                                });
                                let percentage = (value * 100 / sum).toFixed(0) + "%";
                                return percentage;
                            },
                        },

                    },
                }
            });
        }

        $scope.chartstaffsupportlinepositiondist = function () {
            new Chart(document.getElementById("chartstaffsupportlinepositiondist"), {
                type: 'doughnut',
                data: {
                    labels: $scope.lables,
                    datasets: [{
                        label: "บุคลากรแบ่งแยกตามประเภท",
                        backgroundColor: ["#ea5e55", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                        data: $scope.totals
                    }]
                },
                options: {
                    plugins: {
                        datalabels: {
                            color: 'white',
                            formatter: (value, ctx) => {
                                let sum = 0;
                                let dataArr = ctx.chart.data.datasets[0].data;
                                dataArr.map(data => {
                                    sum += data;
                                });
                                let percentage = (value * 100 / sum).toFixed(0) + "%";
                                return percentage;
                            },
                        },

                    },
                    legend: {
                        display: true
                    },
                }
            });
        }

        $scope.chartacademicEmployeeEducation = function () {
            new Chart(document.getElementById("chartacademicEmployeeEducation"), {
                type: 'bar',
                data: {
                    labels: $scope.dlname,
                    datasets: [{
                        label: "บุคลากร สายวิชาการ",
                        backgroundColor: ["#d2f07d", "#7fb6ad", "#5b9dc2"],
                        data: $scope.degreetotals
                    }]
                },
                options: {
                    plugins: {
                        datalabels: {
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

        $scope.chartademicEmployeeSupport = function () {
            new Chart(document.getElementById("chartacademicEmployeeSupport"), {
                type: 'bar',
                data: {
                    labels: $scope.dlname,
                    datasets: [{
                        label: "บุคลากร สายสนับสนุน",
                        backgroundColor: "#b7ded2",
                        data: $scope.degreetotals
                    }]
                },
                options: {
                    plugins: {
                        datalabels: {
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

        // EXECUTE
        $scope.getteacheratworkdisttype();
        $scope.getstaffsupportlinepositiondist();
        $scope.getacademicEmployeeEducation();
        $scope.getacademicEmployeeSupport();
    })
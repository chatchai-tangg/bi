angular.module('app')

    .controller('StatsstaffworkCtrl', function ($scope, $rootScope, $http, $state) {

        //GETDATA

        $scope.getstartworksupportandacadamic = function () {
            $http({
                url: 'http://app.rmutp.ac.th/api/bi/hrm/startworksupportandacadamic',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.datachartsEmpedu = res.data;
                    $scope.deptname = res.data.map(res => res.pos_linename);
                    $scope.totals = res.data.map(res => res.total_start);
                    $scope.chartstartworksupportandacadamic();
                },
                function (error) {
                    console.log(error);
                }
            )
        } //จำนวนคนเริ่มปฏิบัติงาน (ผู้สมัครเข้าทำงาน) แยกตามประเภทบุคลากร (สายวิชาการ-สายสนับสนุน)

        $scope.getstaffleave = function () {
            $http({
                url: 'http://app.rmutp.ac.th/api/bi/hrm/staffleave',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.datachartsEmpedu = res.data;
                    $scope.deptname = res.data.map(res => res.pos_linename);
                    $scope.totals = res.data.map(res => res.sums);
                    $scope.chartstaffleave();
                },
                function (error) {
                    console.log(error);
                }
            )
        } //จำนวนคนลาออก (ไม่รวมเกษียณ) แยกตามประเภทบุคลากร (สายวิชาการ-สายสนับสนุน)

        $scope.getstartworkdistyearfaculty = function () {
            $http({
                url: 'http://app.rmutp.ac.th/api/bi/hrm/startworkdistyearfaculty',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.datachartsEmpedu = res.data;
                    $scope.deptname = res.data.map(res => res.dept_name_th);
                    $scope.totals = res.data.map(res => res.total);
                    $scope.chartstartworkdistyearfaculty();
                },
                function (error) {
                    console.log(error);
                }
            )
        } //คนเริ่มปฏิบัติงาน แยกตามปี แยกตามคณะ

        $scope.getstartworkdistyearinstitute = function () {
            $http({
                url: 'http://app.rmutp.ac.th/api/bi/hrm/startworkdistyearinstitute',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.datachartsEmpedu = res.data;
                    $scope.deptname = res.data.map(res => res.dept_name_th);
                    $scope.totals = res.data.map(res => res.total);
                    $scope.chartstartworkdistyearinstitute();
                },
                function (error) {
                    console.log(error);
                }
            )
        } //คนเริ่มปฏิบัติงาน แยกตามปี แยกตามสำนัก สถาบัน

        $scope.getstartworkdistyeardivision = function () {
            $http({
                url: 'http://app.rmutp.ac.th/api/bi/hrm/startworkdistyeardivision',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.datachartsEmpedu = res.data;
                    $scope.deptname = res.data.map(res => res.dept_name_th);
                    $scope.totals = res.data.map(res => res.total);
                    $scope.chartstartworkdistyeardivision();
                },
                function (error) {
                    console.log(error);
                }
            )
        } //คนเริ่มปฏิบัติงาน แยกตามปี แยกตามกอง

        $scope.getretiredistposition = function () {
            $http({
                url: 'http://app.rmutp.ac.th/api/bi/hrm/retiredistposition',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.datachartsEmpedu = res.data;
                    $scope.deptname = res.data.map(res => res.pos_name_th);
                    $scope.totals = res.data.map(res => res.reitre_teacher);
                    $scope.chartgetretiredistposition();
                },
                function (error) {
                    console.log(error);
                }
            )
        } //จำนวนผู้เกษียณ  จำแนกตามตำแหน่งวิชาการ

        $scope.getretiredistline = function () {
            $http({
                url: 'http://app.rmutp.ac.th/api/bi/hrm/retiredistline',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.datachartsEmpedu = res.data;
                    $scope.deptname = res.data.map(res => res.pos_linename);
                    $scope.totals = res.data.map(res => res.retire_num);
                    $scope.chartgetretiredistline();
                },
                function (error) {
                    console.log(error);
                }
            )
        } //จำนวนผู้เกษียณ  จำแนกตามตำแหน่งวิชาการ ผศ รศ



        // ["#e600ca", "#ff61ed", "#999999", "#00d1ff", "#ffff30", "#a8022d", "#fff7b0", "#00329c", "#662703"],
        //PLOTCHARTS

        $scope.chartstartworksupportandacadamic = function () {
            new Chart(document.getElementById("chartstartworksupportandacadamic"), {
                type: 'doughnut',
                data: {
                    labels: $scope.deptname,
                    datasets: [{
                        label: "บุคลากรแบ่งแยกตามประเภท",
                        backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
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
                        }
                    },
                    legend: {
                        display: true
                    }
                }
            });
        }

        $scope.chartstaffleave = function () {
            new Chart(document.getElementById("chartstaffleave"), {
                type: 'doughnut',
                data: {
                    labels: $scope.deptname,
                    datasets: [{
                        label: "บุคลากรแบ่งแยกตามประเภท",
                        backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
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
                        }
                    },
                    legend: {
                        display: true
                    }
                }
            });
        }

        $scope.chartstartworkdistyearfaculty = function () {
            new Chart(document.getElementById("chartstartworkdistyearfaculty"), {
                type: 'bar',
                data: {
                    labels: $scope.deptname,
                    datasets: [{
                        label: "ข้อมูลปี 2557-2562",
                        backgroundColor: "#a8022d",
                        data: $scope.totals
                    }]
                },
                options: {
                    plugins: {
                        labels: {
                            render: 'value',
                        },
                        datalabels: {
                            color: 'white'
                        }
                    },
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'จำนวนผู้สมัคร'
                    }
                }
            });
        }

        $scope.chartstartworkdistyearinstitute = function () {
            new Chart(document.getElementById("chartstartworkdistyearinstitute"), {
                type: 'bar',
                data: {
                    labels: $scope.deptname,
                    datasets: [{
                        label: "บุคลากรแบ่งแยกตามประเภท",
                        backgroundColor: "#00d1ff",
                        data: $scope.totals
                    }]
                },
                options: {
                    plugins: {
                        colorschemes: {
                            scheme: 'brewer.SetOne6'
                        },
                        datalabels: {
                            color: 'white'
                        }
                    },
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'จำนวนผู้สมัคร'
                    }
                }
            });
        }

        $scope.chartstartworkdistyeardivision = function () {
            new Chart(document.getElementById("chartstartworkdistyeardivision"), {
                type: 'bar',
                data: {
                    labels: $scope.deptname,
                    datasets: [{
                        label: "บุคลากรแบ่งแยกตามประเภท",
                        backgroundColor: "#8e5ea2",
                        data: $scope.totals
                    }]
                },
                options: {
                    plugins: {
                        datalabels: {
                            color: 'white'
                        }
                    },
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'จำนวนผู้สมัคร'
                    }
                }
            });
        }

        $scope.chartgetretiredistposition = function () {
            new Chart(document.getElementById("chartgetretiredistposition"), {
                type: 'doughnut',
                data: {
                    labels: $scope.deptname,
                    datasets: [{
                        label: "บุคลากรแบ่งแยกตามประเภท",
                        // backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                        data: $scope.totals
                    }]
                },
                options: {
                    plugins: {
                        colorschemes: {
                            scheme: 'brewer.SetTwo4'
                        },
                        datalabels: {
                            color: 'black',
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
                    legend: {
                        display: true
                    }
                }
            });
        }

        $scope.chartgetretiredistline = function () {
            new Chart(document.getElementById("chartgetretiredistline"), {
                type: 'doughnut',
                data: {
                    labels: $scope.deptname,
                    datasets: [{
                        label: "บุคลากรแบ่งแยกตามประเภท",
                        // backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                        data: $scope.totals
                    }]
                },
                options: {
                    plugins: {
                        colorschemes: {
                            scheme: 'brewer.Accent3'
                        },
                        datalabels: {
                            color: 'black',
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
                    legend: {
                        display: true
                    }
                }
            });
        }

        // EXECUTE
        $scope.getstartworksupportandacadamic();
        $scope.getstaffleave();
        $scope.getstartworkdistyearfaculty();
        $scope.getstartworkdistyearinstitute();
        $scope.getstartworkdistyeardivision();
        $scope.getretiredistposition();
        $scope.getretiredistline();
    })
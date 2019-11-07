angular.module('app')

    .controller('StatsCtrl', function ($scope, $rootScope, $http, $state) {

        $rootScope.pageTitle = 'BI Jub Jub'

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

        $scope.getteacheratworkdisttype = function () {
            $http({
                url: 'http://app.rmutp.ac.th/api/bi/hrm/teacheratworkdisttype',
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
                url: 'http://app.rmutp.ac.th/api/bi/hrm/staffsupportlinepositiondist',
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






        // PLOTCHARTS

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
                    plugins: {
                        labels: {
                            render: 'percentage',
                            precision: 1,
                            position: 'border',
                            fontColor: '#fff',
                            fontSize: 13,
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
                        label: "บุคลากรแบ่งแยกตามประเภท",
                        backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                        data: $scope.totals
                    }]
                },
                options: {
                    plugins: {
                        labels: {
                            render: 'value',
                            position: 'border',

                            fontSize: 13,
                        },
                    },
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

        $scope.chartteacheratworkdisttype = function () {
            new Chart(document.getElementById("chartteacheratworkdisttype"), {
                type: 'doughnut',
                data: {
                    labels: $scope.lables,
                    datasets: [{
                        label: "บุคลากรแบ่งแยกตามประเภท",
                        backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                        data: $scope.totals
                    }]
                },
                options: {
                    plugins: {
                        labels: {
                            render: 'percentage',
                            precision: 1,
                            position: 'border',
                            fontColor: '#fff',
                            fontSize: 13,
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
                        backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                        data: $scope.totals
                    }]
                },
                options: {
                    plugins: {
                        labels: {
                            render: 'percentage',
                            precision: 1,
                            position: 'border',
                            fontColor: '#fff',
                            fontSize: 13,
                        },
                    },
                    legend: {
                        display: true
                    },
                }
            });
        }









        //EXECUTE
        $scope.getdataemptype();
        $scope.getteacheratworkdisttype();
        $scope.getstaffsupportlinepositiondist();
        $scope.getappointedexecutive62();


    })
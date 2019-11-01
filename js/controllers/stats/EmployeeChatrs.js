angular.module('app')

    .controller('StatsCtrl', function ($scope, $rootScope, $http, $state) {

        $rootScope.pageTitle = 'BI Jub Jub'

        $scope.currentNav = getChildStatename($state.$current.name);

        $scope.menu = [{
                name: 'stafftype',
                label: 'จำแนกตามประเภทบุคลากร',
                state: 'main.mainstats.stafftype'
            },
            {
                name: 'staffstartwork',
                label: 'จำแนกการเข้า-ออกของบุคลากร',
                state: 'main.mainstats.staffstartwork'
            },
            {
                name: 'disteducation',
                label: 'จำแนกตามวุฒิการศึกษา',
                state: 'main.mainstats.disteducation'
            },
        ];

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

        $scope.chartteacheratworkdisttype = function () {
            new Chart(document.getElementById("chartteacheratworkdisttype"), {
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

        $scope.chartstaffsupportlinepositiondist = function () {
            new Chart(document.getElementById("chartstaffsupportlinepositiondist"), {
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

        $scope.chartgetretiredistposition = function () {
            new Chart(document.getElementById("chartgetretiredistposition"), {
                type: 'bar',
                data: {
                    labels: $scope.deptname,
                    datasets: [{
                        label: "บุคลากรแบ่งแยกตามประเภท",
                        backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                        data: $scope.totals
                    }]
                },
                options: {
                    legend: {
                        display: true
                    }
                }
            });
        }

        $scope.chartgetretiredistline = function () {
            new Chart(document.getElementById("chartgetretiredistline"), {
                type: 'bar',
                data: {
                    labels: $scope.deptname,
                    datasets: [{
                        label: "บุคลากรแบ่งแยกตามประเภท",
                        backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                        data: $scope.totals
                    }]
                },
                options: {
                    legend: {
                        display: true
                    }
                }
            });
        }





        //EXECUTE
        $scope.getdataemptype();
        $scope.getteacheratworkdisttype();
        $scope.getstaffsupportlinepositiondist();
        $scope.getretiredistposition();
        $scope.getretiredistline();
        $scope.getappointedexecutive62();


    })
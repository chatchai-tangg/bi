angular.module('app')

    .controller('StatsCtrl', function ($scope, $rootScope, $http) {

        $rootScope.pageTitle = 'BI Jub Jub'
        $scope.datachartsEmptype = [];
        $scope.datachartsEmpedu = [];
        $scope.menu = [];

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

        $scope.getacademicEmployeeEducation = function () {
            $http({
                url: 'http://app.rmutp.ac.th/api/bi/hrm/academicEmployeeEducation',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.datachartsEmpedu = res.data;
                    $scope.dlname = res.data.map(res => res.dl_name_th);
                    $scope.degreetotals = res.data.map(res => res.degreeNum);
                    console.log($scope.dlname);
                    console.log($scope.degreetotals);
                    $scope.chartacademicEmployeeEducation();
                },
                function (error) {
                    console.log(error);
                }
            )
        }

        $scope.getacademicEmployeeSupport = function () {
            $http({
                url: 'http://app.rmutp.ac.th/api/bi/hrm/academicEmployeeSupport',
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
        }

        $scope.getstartworkdistyeardepartline = function () {
            $http({
                url: 'http://app.rmutp.ac.th/api/bi/hrm/startworkdistyeardepartline',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.datachartsEmpedu = res.data;
                    $scope.deptname = res.data.map(res => res.dept_name_th);
                    $scope.totals = res.data.map(res => res.total);
                    $scope.chartstartworkdistyeardepartline();
                },
                function (error) {
                    console.log(error);
                }
            )
        }



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

        $scope.chartacademicEmployeeEducation = function () {
            new Chart(document.getElementById("chartacademicEmployeeEducation"), {
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

        $scope.chartademicEmployeeSupport = function () {
            new Chart(document.getElementById("chartacademicEmployeeSupport"), {
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

        $scope.chartstartworkdistyeardepartline = function () {
            new Chart(document.getElementById("chartstartworkdistyeardepartline"), {
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
        $scope.getdataempeducation();
        $scope.getacademicEmployeeEducation();
        $scope.getacademicEmployeeSupport();
        $scope.getstartworkdistyeardepartline();


    })
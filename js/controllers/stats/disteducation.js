angular.module('app')

    .controller('StatdisteducationCtrl', function ($scope, $rootScope, $http, $state) {

        $rootScope.pageTitle = 'BI Jub Jub';


        //GETDATA
        $scope.getacademicEmployeeEducation = function () {
            $http({
                url: 'http://app.rmutp.ac.th/api/bi/hrm/academicEmployeeEducation',
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
        } // จำแนกบุคลากรตามการศึกษา (สายสนับสนุน)

        //PLOTCHARTS

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


        // EXECUTE

        $scope.getacademicEmployeeEducation();
        $scope.getacademicEmployeeSupport();
    })
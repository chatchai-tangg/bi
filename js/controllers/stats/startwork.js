angular.module('app')

    .controller('StatsstaffworkCtrl', function ($scope, $rootScope, $http, $state) {

        $rootScope.pageTitle = 'BI Jub Jub';


        //GETDATA
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


        //PLOTCHARTS
        $scope.chartstartworkdistyearfaculty = function () {
            new Chart(document.getElementById("chartstartworkdistyearfaculty"), {
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

        $scope.chartstartworkdistyearinstitute = function () {
            new Chart(document.getElementById("chartstartworkdistyearinstitute"), {
                type: 'horizontalBar',
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

        $scope.chartstartworkdistyeardivision = function () {
            new Chart(document.getElementById("chartstartworkdistyeardivision"), {
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

        $scope.chartstartworksupportandacadamic = function () {
            new Chart(document.getElementById("chartstartworksupportandacadamic"), {
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

        // EXECUTE
        $scope.getstartworkdistyearfaculty();
        $scope.getstartworkdistyearinstitute();
        $scope.getstartworkdistyeardivision();
        $scope.getstartworksupportandacadamic();
    })
angular.module('app')

.controller('BiCtrl', function( $scope, $mdSidenav, $rootScope ){

    $scope.rightMenu = function(){
        $mdSidenav('sidenav-right').toggle();
    }

    $rootScope.rightSideNav = {
        title : 'Sidenav Right',
        sections: [
            {
                title: 'Section 1',
                menu: [
                    {name: 'Dashboard', state: 'main.bi.dashboard' },
                    {name: 'Report 1 นักศึกษา', state: 'main.bi.report1' },
                    {name: 'Report 2 บุคลากร บลาๆๆ', state: 'main.bi.report2' },
                    {name: 'Report 3 อะไรสักอย่าง 555', state: 'main.bi.report3' },
                    {name: 'Report 1 นักศึกษา', state: 'main.bi.report1' },
                    {name: 'Report 2 บุคลากร บลาๆๆ', state: 'main.bi.report2' },
                    {name: 'Report 3 อะไรสักอย่าง 555', state: 'main.bi.report3' },
                ],
            },
            {
                title: 'Section 2',
                menu: [
                    {name: 'Dashboard ชื่อยาวๆๆๆ มากๆๆๆ ไหวบ่ 5555 666', state: 'main.bi.dashboard' },
                    {name: 'Report 1', state: 'main.bi.report1' },
                    {name: 'Report 2', state: 'main.bi.report2' },
                    {name: 'Report 3', state: 'main.bi.report3' },
                ],
            },
        ],
    };

})

.controller('BiDashboardCtrl', function( $scope, $http, Setting, $rootScope ){

    $rootScope.pageTitle = 'BI Dashboard';

    var lables;
    var totals;
    var load = function () {
        $http({
            url: Setting.baseApi+'/bi/hrm/Employeetype',
            method: 'GET',
        }).then(
            function (res) {
                lables = res.data.map(res => res.et_name);
                totals = res.data.map(res => res.Total);
                chart();
            },
            function (error) {
                console.log(error);
            }
        )
    }
    load();

    var chart = function () {
        new Chart(document.getElementById("chartsemptype"), {
            type: 'pie',
            data: {
                labels: lables,
                datasets: [{
                    label: "บุคลากรแบ่งแยกตามประเภท",
                    // backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                    data: totals
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

})

.controller('BiReport1Ctrl', function( $scope, $rootScope ){

    $rootScope.pageTitle = 'Report 1';

})

.controller('BiReport2Ctrl', function( $scope, $rootScope ){

    $rootScope.pageTitle = 'Report 2';

})

.controller('BiReport3Ctrl', function( $scope, $rootScope ){

    $rootScope.pageTitle = 'Report 3';

})
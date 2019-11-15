angular.module('app')

    .controller('StddetailsCTRL', function ($scope, $rootScope, $http) {

        $scope.datachartsSTD = [];

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

        $scope.getstdsocialdistyear = function () {
            $http({
                url: 'http://app.rmutp.ac.th/api/bi/std/stdsocialdistyear',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.datachartsSTD = res.data;
                    $scope.lbnamesocial = res.data.map(res => res.ADMITACADYEAR);
                    $scope.totalssocial = res.data.map(res => res.STUDENT);
                    $scope.chartstdsocialsciencedistyear();
                },
                function (error) {
                    console.log(error);
                }
            )
        } //นักศึกษาแยกสายวิทย์-สายสังคม (สังคม)

        $scope.getstdsciencedistyear = function () {
            $http({
                url: 'http://app.rmutp.ac.th/api/bi/std/stdsciencedistyear',
                method: 'GET',
            }).then(
                function (res) {
                    $scope.datachartsSTD = res.data;
                    $scope.lbnamescience = res.data.map(res => res.ADMITACADYEAR);
                    $scope.totalsscience = res.data.map(res => res.STUDENT);
                    $scope.chartstdsocialsciencedistyear();
                },
                function (error) {
                    console.log(error);
                }
            )
        } //นักศึกษาแยกสายวิทย์-สายสังคม (วิทยาศาสตร์)

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
                    $scope.lbnamesdebtdislodge = res.data.map(res => res.ACADYEAR);
                    $scope.totalsdebtdislodge = res.data.map(res => res.SUMBALANCE);

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
                        backgroundColor: "#9370DB"
                    }]
                },
                options: {
                    legend: {
                        display: true
                    },
                    title: {
                        display: false,
                        text: 'จำนวนการสมัครนักศึกษา'
                    }
                }
            });
        }

        $scope.chartstddistyeartype = function () {
            new Chart(document.getElementById("chartstddistyeartype"), {
                type: 'line',
                data: {
                    labels: $scope.lbnamenormal,
                    datasets: [{
                            label: "จำนวนนักศึกษา (ปกติ)",
                            data: $scope.totalsnormal,
                            borderColor: "#3e95cd",
                            fill: false
                        },
                        {
                            label: "จำนวนนักศึกษา (ลาพักการศึกษา)",
                            data: $scope.totalstakeleave,
                            borderColor: "#8e5ea2",
                            fill: false
                        },
                        {
                            label: "จำนวนนักศึกษา (ลาออก)",
                            data: $scope.totalsresign,
                            borderColor: "#e8c3b9",
                            fill: false
                        }, {
                            label: "จำนวนนักศึกษา (พ้นสภาพ)",
                            data: $scope.totalsdislodge,
                            borderColor: "#c45850",
                            fill: false
                        }
                    ]
                },
                options: {
                    legend: {
                        display: true
                    },
                    title: {
                        display: false,
                        text: 'จำนวนการสมัครนักศึกษา'
                    }
                }
            });
        }

        $scope.chartstdsocialsciencedistyear = function () {
            new Chart(document.getElementById("chartstdsocialsciencedistyear"), {
                type: 'line',
                data: {
                    labels: $scope.lbnamesocial,
                    datasets: [{
                            label: "นักศึกษา (สายวิทยาศาสตร์)",
                            data: $scope.totalssocial,
                            borderColor: "#3e95cd",
                            fill: false
                        },
                        {
                            label: "นักศึกษา (สายสังคม)",
                            data: $scope.totalsscience,
                            borderColor: "#8e5ea2",
                            fill: false
                        },
                    ]
                },
                options: {
                    legend: {
                        display: true
                    },
                    title: {
                        display: false,
                        text: 'จำนวนการสมัครนักศึกษา'
                    }
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
                            borderColor: "#3e95cd",
                            fill: false
                        },
                        {
                            label: "เทอม2",
                            data: $scope.totalsadviser2,
                            borderColor: "#8e5ea2",
                            fill: false
                        },
                        {
                            label: "เทอม3",
                            data: $scope.totalsadviser3,
                            borderColor: "#8e5ea2",
                            fill: false
                        },
                    ]
                },
                options: {
                    legend: {
                        display: true
                    },
                }
            });
        }

        $scope.chartscholardistyear = function () {
            new Chart(document.getElementById("chartscholardistyear"), {
                type: 'bar',
                data: {
                    labels: $scope.lbnamescholar59,
                    datasets: [{
                            label: "ปีการศึกษา 2559",
                            data: $scope.totalsscholar59,
                            borderColor: "#3e95cd",
                            fill: false
                        },
                        {
                            label: "ปีการศึกษา 2560",
                            data: $scope.totalsscholar60,
                            borderColor: "#8e5ea2",
                            fill: false
                        },
                        {
                            label: "ปีการศึกษา 2561",
                            data: $scope.totalsscholar61,
                            borderColor: "#8e5ea2",
                            fill: false
                        },
                        {
                            label: "ปีการศึกษา 2562",
                            data: $scope.totalsscholar62,
                            borderColor: "#8e5ea2",
                            fill: false
                        },
                    ]
                },
                options: {
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
                    labels: $scope.lbnamesdebtdislodge,
                    datasets: [{
                            label: "นักศึกษา (พ้นสภาพ)",
                            data: $scope.totalsdebtdislodge,
                            borderColor: "#3e95cd",
                            fill: false
                        },
                        {
                            label: "นักศึกษา (ลาออก)",
                            data: $scope.totalsdebtresign,
                            borderColor: "#3e95cd",
                            fill: false
                        },
                        {
                            label: "นักศึกษา (ปกติ)",
                            data: $scope.totalsdebtnormal,
                            borderColor: "#3e95cd",
                            fill: false
                        },
                    ]
                },
                options: {
                    legend: {
                        display: true
                    },
                }
            });
        }

        $scope.chartcoursesdistsciencesocial = function () {
            new Chart(document.getElementById("chartcoursesdistsciencesocial"), {
                type: 'bar',
                data: {
                    labels: $scope.lbnamecourse,
                    datasets: [{
                        label: "ภาควิชา",
                        data: $scope.totalscourse,
                        borderColor: "#3e95cd",
                        fill: false
                    }, ]
                },
                options: {
                    legend: {
                        display: true
                    },
                }
            });
        }


        $scope.getacademicEmployeeEducation();
        $scope.getstdnormaldisttypeyear();
        $scope.getstdtakeleavedisttypeyear();
        $scope.chartstddistyeartype();
        $scope.getstdresigndisttypeyear();
        $scope.getstddislodgedisttypeyear();
        $scope.getstdsocialdistyear();
        $scope.getstdsciencedistyear();
        $scope.getadviserdistyearterm1();
        $scope.getadviserdistyearterm2();
        $scope.getadviserdistyearterm3();
        $scope.getscholardistyear59();
        $scope.getscholardistyear60();
        $scope.getscholardistyear61();
        $scope.getscholardistyear62();
        $scope.getdebtstddislodgedistyear();
        $scope.getdebtstdresigndistyear();
        $scope.getdebtstdnormaldistyear();
        $scope.getcoursesdistsciencesocial();

    })
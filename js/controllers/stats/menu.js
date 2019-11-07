angular.module('app')

    .controller('MenuCtrl', function ($scope, $rootScope, $state) {

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

    })
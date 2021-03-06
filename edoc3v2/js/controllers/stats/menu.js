angular.module('app')

    .controller('MenuCtrl', function ($scope, $rootScope, $state) {

        $rootScope.pageTitle = 'แดชบอร์ดข้อมูลสารสนเทศ'

        $scope.currentNav = getChildStatename($state.$current.name);

        $scope.menu = [{
                name: 'stafftype',
                label: 'ประเภทบุคลากร',
                state: 'main.mainstats.stafftype'
            },
            {
                name: 'staffline',
                label: 'สายงานบุคลากรและวุฒิการศึกษา',
                state: 'main.mainstats.staffline'
            },
            {
                name: 'staffstartwork',
                label: 'การเข้า-ออกของบุคลากร',
                state: 'main.mainstats.staffstartwork'
            },
            // {
            //     name: 'disteducation',
            //     label: 'วุฒิการศึกษา',
            //     state: 'main.mainstats.disteducation'
            // },
            {
                name: 'stddetails',
                label: 'ข้อมูลนักศึกษา',
                state: 'main.mainstats.stddetails'
            },
        ];

    })
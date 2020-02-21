angular.module('app')

.config(function( $mdThemingProvider, $mdDateLocaleProvider ){


    $mdThemingProvider.theme('default')
    .primaryPalette('deep-purple')
    .accentPalette('deep-orange');

    $mdThemingProvider.theme('sidenav')
    .primaryPalette('deep-purple', {'default':'700'})
    .dark();

    $mdThemingProvider.theme('toolbar')
    .primaryPalette('grey', {'default':'200'});

    $mdThemingProvider.theme('loginx')
    .primaryPalette('teal');


    $mdDateLocaleProvider.months = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
    $mdDateLocaleProvider.shortMonths = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    $mdDateLocaleProvider.days = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];
    $mdDateLocaleProvider.shortDays = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];
    $mdDateLocaleProvider.monthHeaderFormatter = function(date) {
        return $mdDateLocaleProvider.shortMonths[date.getMonth()] + ' ' + (date.getFullYear() + 543);
    };
    $mdDateLocaleProvider.formatDate = function(date) {
        return `${moment(date).format('DD/MM')}/${moment(date).get('year') + 543}`;
    };
    $mdDateLocaleProvider.parseDate = function(dateString) {
        var dateArray = dateString.split("/");
        dateString = dateArray[1] + "/" + dateArray[0] + "/" + (dateArray[2] - 543);
        var m = moment(dateString, 'L', true);
        return m.isValid() ? m.toDate() : new Date(NaN);
    };

});

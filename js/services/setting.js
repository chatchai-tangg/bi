angular.module('app')

.service('Setting', function(){

    var Setting = this;

    Setting.appName = 'Edoc 3 RMUTP';
    Setting.version = '0.0.6';
    Setting.baseApi = 'https://app.rmutp.ac.th/api';
    Setting.afterLoginState = 'main.edoc.inbox';

})

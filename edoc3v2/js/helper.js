var dynamicSort = function(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var _a = fairMatch(a[property]);
        var _b = fairMatch(b[property]);
        var result = (_a < _b) ? -1 : (_a > _b) ? 1 : 0;
        // var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}


var fairMatch = function(txt) {
    if(txt==null){
        return '0';
    }
    if(typeof txt.toLowerCase === 'undefined'){
        return txt;
    }
    return txt.toLowerCase();
}


var getChildStatename = function( fullStatename ){
    if( typeof fullStatename==='string' ){
        return fullStatename.split('.')[2];
    }
    return null;
}

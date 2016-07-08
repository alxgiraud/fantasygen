/*global app*/
app.directive('totalSelector', function () {
    'use strict';
    return {
        restrict: 'E',
        scope: {
            selectedValue: '=selectedValue',
            values: '=values',
            selectTotalItems: '&selectTotalItems'
        },
        templateUrl: 'views/templates/totalSelector.html',
        link: function (scope, element, attrs) {
            scope.onUpdateTotal = function (total) {
                scope.selectTotalItems({ total: total });
            };
        }
    };
});

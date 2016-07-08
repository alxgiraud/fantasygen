/*global app*/
app.controller('navCtrl', ['$scope', '$window', function ($scope, $window) {
    'use strict';

    $scope.isVertical = ($window.innerWidth < 768) ? true : false;
    $scope.type = ($window.innerWidth < 768) ? 'pills' : 'tabs';
}]);

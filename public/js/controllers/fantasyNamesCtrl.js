/*global app*/
app.controller('fantasyNamesCtrl', ['$scope', 'nameGenerator', function ($scope, nameGenerator) {
    'use strict';

    function generateNames() {
        $scope.names = [];
        var i;
        for (i = 0; i < $scope.totalItems; i += 1) {
            $scope.names.push(nameGenerator.getFantasyName());
        }
    }

    $scope.totalItems = 60;
    $scope.onSelectTotalItems = function (total) {
        $scope.totalItems = total;
        generateNames();
    };

    $scope.refresh = function () {
        generateNames();
    };

    generateNames();
}]);

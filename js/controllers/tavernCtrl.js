/*global app*/
app.controller('tavernCtrl', ['$scope', 'tavernGenerator', function ($scope, tavernGenerator) {
    'use strict';

    function generateTaverns() {
        var i,
            j,
            maxAttemps = 100,
            result;

        $scope.taverns = [];

        for (i = 0, j = 0; j < $scope.totalItems; i += 1) {

            if (i > maxAttemps) {
                j = $scope.totalItems;
            }

            result = tavernGenerator.getName($scope.startWith, $scope.endWith, $scope.contains, $scope.doesntContains);

            if (typeof result !== 'undefined' && result.length > 0 && $scope.taverns.indexOf(result) === -1) {
                j += 1;
                $scope.taverns.push(result);
            }
        }
    }

    $scope.taverns = [];
    $scope.totalItems = 30;

    $scope.onClickSettings = function () {
        $scope.hasSettingsDisplayed = ($scope.hasSettingsDisplayed) ? false : true;
    };

    $scope.startWith = '';
    $scope.endWith = '';
    $scope.contains = '';
    $scope.doesntContains = '';

    $scope.nouns = tavernGenerator.getNouns().sort().join(';');
    $scope.adjectives = tavernGenerator.getAdjectives().sort().join(';');
    $scope.titles = tavernGenerator.getTitles().sort().join(';');

    $scope.onSelectTotalItems = function (total) {
        $scope.totalItems = total;
        generateTaverns();
    };

    $scope.refresh = function () {
        tavernGenerator.setNouns($scope.nouns.toLowerCase().split(';'));
        tavernGenerator.setAdjectives($scope.adjectives.toLowerCase().split(';'));
        tavernGenerator.setTitles($scope.titles.toLowerCase().split(';'));
        generateTaverns();
    };

    $scope.reset = function () {
        $scope.startWith = '';
        $scope.endWith = '';
        $scope.contains = '';
        $scope.doesntContains = '';
        tavernGenerator.setDefaultValues();
        $scope.nouns = tavernGenerator.getNouns().sort().join(';');
        $scope.adjectives = tavernGenerator.getAdjectives().sort().join(';');
        $scope.titles = tavernGenerator.getTitles().sort().join(';');
        generateTaverns();
    };

    generateTaverns();

}]);

/*global app*/
app.controller('groupNamesCtrl', ['$scope', 'groupNamesGenerator', function ($scope, groupNamesGenerator) {
    'use strict';

    function getTableNames(title, fct) {
        var names = [],
            i;

        for (i = 0; i < $scope.totalItems; i += 1) {
            names.push(fct());
        }
        return {
            title: title,
            names: names
        };
    }

    function generateGroupNames(groupId) {
        switch (groupId) {
        case 0:
            $scope.table = getTableNames('Mysict Orders', groupNamesGenerator.getMysticOrderName);
            break;
        case 1:
            $scope.table = getTableNames('Military Units', groupNamesGenerator.getMilitaryUnitsName);
            break;
        case 2:
            $scope.table = getTableNames('Thieves & Assassins', groupNamesGenerator.getThievesAndAssassinsName);
            break;
        }
    }

    $scope.groups = [
        {
            id: 0,
            label: 'Mystic Orders'
        },
        {
            id: 1,
            label: 'Military Units'
        },
        {
            id: 2,
            label: 'Thieves & Assassins'
        }
    ];

    $scope.selectedGroup = $scope.groups[0];

    $scope.onSelectGroup = function (choice) {
        $scope.selectedGroup = choice;
        generateGroupNames(choice.id);
    };

    $scope.totalItems = 30;
    
    $scope.onSelectTotalItems = function (total) {
        $scope.totalItems = total;
        generateGroupNames($scope.selectedGroup.id);
    };
    
    $scope.refresh = function () {
        generateGroupNames($scope.selectedGroup.id);
    };

    generateGroupNames($scope.selectedGroup.id);

}]);

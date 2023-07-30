/*global app*/
app.controller('fantasticSpeciesCtrl', ['$scope', 'fantasticSpeciesGenerator', function ($scope, fantasticSpeciesGenerator) {
    'use strict';

    function getTableNames(title, fct, gender) {
        var names = [],
            i;
        
        for (i = 0; i < $scope.totalItems; i += 1) {
            names.push(fct());
        }
        return {
            title: title,
            names: names,
            gender: gender
        };
    }

    function generateSpecies(speciesId, tableId) {

        if (typeof tableId === 'undefined') {
            $scope.tables = [];
        }

        switch (speciesId) {
        case 0:
            $scope.tables[0] = getTableNames('Goblins', fantasticSpeciesGenerator.getGoblinName);
            break;
        case 1:
            $scope.tables[0] = getTableNames('Orcs', fantasticSpeciesGenerator.getOrcName);
            break;
        case 2:
            $scope.tables[0] = getTableNames('Ogres', fantasticSpeciesGenerator.getOgreName);
            break;
        case 3:
            if (tableId === 0 || typeof tableId === 'undefined') {
                $scope.tables[0] = getTableNames('Dwarfs', fantasticSpeciesGenerator.getMaleDwarfName, 'male');
            }
            if (tableId === 1 || typeof tableId === 'undefined') {
                $scope.tables[1] = getTableNames('Dwarfs', fantasticSpeciesGenerator.getFemaleDwarfName, 'female');
            }
            break;
        case 4:
            if (tableId === 0 || typeof tableId === 'undefined') {
                $scope.tables[0] = getTableNames('Halflings', fantasticSpeciesGenerator.getMaleHalflingName, 'male');
            }
            if (tableId === 1 || typeof tableId === 'undefined') {
                $scope.tables[1] = getTableNames('Halflings', fantasticSpeciesGenerator.getFemaleHalflingName, 'female');
            }
            break;
        case 5:
            if (tableId === 0 || typeof tableId === 'undefined') {
                $scope.tables[0] = getTableNames('Gnomes', fantasticSpeciesGenerator.geMaleGnomeName, 'male');
            }
            if (tableId === 1 || typeof tableId === 'undefined') {
                $scope.tables[1] = getTableNames('Gnomes', fantasticSpeciesGenerator.getFemaleGnomeName, 'female');
            }
            break;
        case 6:
            if (tableId === 0 || typeof tableId === 'undefined') {
                $scope.tables[0] = getTableNames('Elves', fantasticSpeciesGenerator.getMaleElfName, 'male');
            }
            if (tableId === 1 || typeof tableId === 'undefined') {
                $scope.tables[1] = getTableNames('Elves', fantasticSpeciesGenerator.getFemaleElfName, 'female');
            }
            if (tableId === 2 || typeof tableId === 'undefined') {
                $scope.tables[2] = getTableNames('Alternate Elves', fantasticSpeciesGenerator.getAlternateMaleElfName, 'male');
            }
            if (tableId === 3 || typeof tableId === 'undefined') {
                $scope.tables[3] = getTableNames('Alternate Elves', fantasticSpeciesGenerator.getAlternateFemaleElfName, 'female');
            }
            break;
        case 7:
            if (tableId === 0 || typeof tableId === 'undefined') {
                $scope.tables[0] = getTableNames('Cavemen', fantasticSpeciesGenerator.getMaleCavemenName, 'male');
            }
            if (tableId === 1 || typeof tableId === 'undefined') {
                $scope.tables[1] = getTableNames('Cavemen', fantasticSpeciesGenerator.getFemaleCavemenName, 'female');
            }
            break;
        case 8:
            if (tableId === 0 || typeof tableId === 'undefined') {
                $scope.tables[0] = getTableNames('Faerykind', fantasticSpeciesGenerator.getMaleFaerykindName, 'male');
            }
            if (tableId === 1 || typeof tableId === 'undefined') {
                $scope.tables[1] = getTableNames('Faerykind', fantasticSpeciesGenerator.getFemaleFaerykindName, 'female');
            }
            if (tableId === 2 || typeof tableId === 'undefined') {
                $scope.tables[2] = getTableNames('Alternate Faerykind', fantasticSpeciesGenerator.getAlternateMaleFaerykindName, 'male');
            }
            if (tableId === 3 || typeof tableId === 'undefined') {
                $scope.tables[3] = getTableNames('Alternate Faerykind', fantasticSpeciesGenerator.getAlternateFemaleFaerykindName, 'female');
            }
            break;
        case 9:
            if (tableId === 0 || typeof tableId === 'undefined') {
                $scope.tables[0] = getTableNames('Dark Elves', fantasticSpeciesGenerator.getMaleDarkElfName, 'male');
            }
            if (tableId === 1 || typeof tableId === 'undefined') {
                $scope.tables[1] = getTableNames('Dark Elves', fantasticSpeciesGenerator.getFemaleDarkElfName, 'female');
            }
            if (tableId === 2 || typeof tableId === 'undefined') {
                $scope.tables[2] = getTableNames('Alternate Dark Elves', fantasticSpeciesGenerator.getAlternateMaleDarkElfName, 'male');
            }
            if (tableId === 3 || typeof tableId === 'undefined') {
                $scope.tables[3] = getTableNames('Alternate Dark Elves', fantasticSpeciesGenerator.getAlternateFemaleDarkElfName, 'female');
            }
            break;
        case 10:
            if (tableId === 0 || typeof tableId === 'undefined') {
                $scope.tables[0] = getTableNames('Half-Demons', fantasticSpeciesGenerator.getMaleHalfDemonName, 'male');
            }
            if (tableId === 1 || typeof tableId === 'undefined') {
                $scope.tables[1] = getTableNames('Half-Demons', fantasticSpeciesGenerator.getFemaleHalfDemonName, 'female');
            }
            break;
        case 11:
            if (tableId === 0 || typeof tableId === 'undefined') {
                $scope.tables[0] = getTableNames('Dragons', fantasticSpeciesGenerator.getMaleDragonName, 'male');
            }
            if (tableId === 1 || typeof tableId === 'undefined') {
                $scope.tables[1] = getTableNames('Dragons', fantasticSpeciesGenerator.getFemaleDragonName, 'female');
            }
            break;
        case 12:
            $scope.tables[0] = getTableNames('Demons', fantasticSpeciesGenerator.getDemonName);
            break;
        case 13:
            if (tableId === 0 || typeof tableId === 'undefined') {
                $scope.tables[0] = getTableNames('Angels', fantasticSpeciesGenerator.getMaleAngelName, 'male');
            }
            if (tableId === 1 || typeof tableId === 'undefined') {
                $scope.tables[1] = getTableNames('Angels', fantasticSpeciesGenerator.getFemaleAngelName, 'female');
            }
            break;
        }
    }

    $scope.species = [
        {
            id: 0,
            label: 'Goblins'
        },
        {
            id: 1,
            label: 'Orcs'
        },
        {
            id: 2,
            label: 'Ogres'
        },
        {
            id: 3,
            label: 'Dwarfs'
        },
        {
            id: 4,
            label: 'Halflings'
        },
        {
            id: 5,
            label: 'Gnomes'
        },
        {
            id: 6,
            label: 'Elves'
        },
        {
            id: 7,
            label: 'Cavemen'
        },
        {
            id: 8,
            label: 'Faerykind'
        },
        {
            id: 9,
            label: 'Dark Elves'
        },
        {
            id: 10,
            label: 'Half-Demons'
        },
        {
            id: 11,
            label: 'Dragons'
        },
        {
            id: 12,
            label: 'Demons'
        },
        {
            id: 13,
            label: 'Angels'
        }

    ];

    $scope.tables = [];

    $scope.selectedSpecies = $scope.species[0];

    $scope.onSelectSpecies = function (choice) {
        $scope.selectedSpecies = choice;
        generateSpecies(choice.id);
    };

    $scope.totalItems = 24;
    $scope.onSelectTotalItems = function (total, tableId) {
        $scope.totalItems = total;
        generateSpecies($scope.selectedSpecies.id);
    };

    $scope.refresh = function (tableId) {
        generateSpecies($scope.selectedSpecies.id, tableId);
    };

    generateSpecies($scope.selectedSpecies.id);

}]);

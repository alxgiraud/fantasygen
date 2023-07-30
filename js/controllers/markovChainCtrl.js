/*global app*/
/*jslint nomen: true*/
app.controller('howItWorksModalCtrl', function ($scope, $uibModalInstance) {
    'use strict';
    $scope.ok = function () {
        $uibModalInstance.close();
    };
});

app.controller('renameModalCtrl', function ($scope, $uibModalInstance, title, renameDictionary) {
    'use strict';
    $scope.title = title;

    $scope.cancel = function () {
        $uibModalInstance.close();
    };

    $scope.rename = function () {
        if (typeof $scope.title !== 'undefined' && $scope.title.length > 0) {
            renameDictionary($scope.title);
            $uibModalInstance.close();
        }
    };
});

app.controller('deleteModalCtrl', function ($scope, $uibModalInstance, title, deleteDictionary) {
    'use strict';

    $scope.title = title;

    $scope.cancel = function () {
        $uibModalInstance.close();
    };

    $scope.remove = function () {
        deleteDictionary();
        $uibModalInstance.close();
    };
});

app.controller('loadModalCtrl', function ($scope, $http, $uibModalInstance, loadDictionaries) {
    'use strict';

    $scope.hasUrlExamplesDisplayed = false;
    $scope.onClickExamples = function () {
        $scope.hasUrlExamplesDisplayed = ($scope.hasUrlExamplesDisplayed) ? false : true;
    };

    $scope.cancel = function () {
        $uibModalInstance.close();
    };

    $scope.load = function () {
        $scope.clicked = true;
        $scope.error = '';
        if (typeof $scope.url !== 'undefined' && $scope.url.length > 0) {
            $scope.isLoading = true;
            $http.get($scope.url)
                .then(function (result) {
                    var dictionaries = [];

                    if (!(result.data instanceof Array)) {
                        dictionaries.push(result.data);
                    } else {
                        dictionaries = result.data;
                    }

                    $scope.isLoading = false;
                    if (!dictionaries[0].hasOwnProperty('title')) {
                        $scope.error = 'Error: Missing property: \'title\'';

                    } else if (!dictionaries[0].hasOwnProperty('values')) {
                        $scope.error = 'Error: Missing property: \'values\'';

                    } else {
                        loadDictionaries(dictionaries);
                        $scope.clicked = false;
                        $uibModalInstance.close();
                    }
                })
                .catch(function (error) {
                    $scope.isLoading = false;
                    $scope.error = 'Error: Cannot get \'' + $scope.url + '\'';
                });
        } else {
            $scope.error = 'Please enter an URL';
        }
    };
});

app.controller('resetModalCtrl', function ($scope, $uibModalInstance, resetDictionaries) {
    'use strict';

    $scope.cancel = function () {
        $uibModalInstance.close();
    };

    $scope.reset = function () {
        resetDictionaries();
        $uibModalInstance.close();
    };
});


app.controller('markovChainCtrl', ['$scope', '$window', '$q', '$uibModal', 'pouchDBServices', 'markovChainGenerator', function ($scope, $window, $q, $uibModal, pouchDBServices, markovChainGenerator) {
    'use strict';

    var util = {
            hasTitle: function (dictionaries, title) {
                var i;
                for (i = 0; i < dictionaries.length; i += 1) {
                    if (dictionaries[i].title === title) {
                        return true;
                    }
                }
                return false;
            },
            creationOrder: function (a, b) {
                return (a.doc.creationDate > b.doc.creationDate) ? 1 : -1;
            }
        },

        previousLength,
        previousOrder;

    /* Modal management */
    $scope.openHowItWorksModal = function () {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'howItWorksModalContent.html',
            controller: 'howItWorksModalCtrl'
        });
    };

    $scope.openRenameModal = function () {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'renameModalContent.html',
            controller: 'renameModalCtrl',
            resolve: {
                title: function () {
                    return $scope.selectedDictionary.title;
                },
                renameDictionary: function () {
                    return $scope.renameDictionary;
                }
            }
        });
    };

    $scope.openDeleteModal = function () {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'deleteModalContent.html',
            controller: 'deleteModalCtrl',
            resolve: {
                title: function () {
                    return $scope.selectedDictionary.title;
                },
                deleteDictionary: function () {
                    return $scope.deleteDictionary;
                }
            }
        });
    };

    $scope.openLoadModal = function () {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'loadModalContent.html',
            controller: 'loadModalCtrl',
            resolve: {
                loadDictionaries: function () {
                    return $scope.loadDictionaries;
                }
            }
        });
    };

    $scope.openResetModal = function () {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'resetModalContent.html',
            controller: 'resetModalCtrl',
            resolve: {
                resetDictionaries: function () {
                    return $scope.resetDictionaries;
                }
            }
        });
    };
    /* */

    /* Dictionaries management */
    $scope.dictionaries = [];

    $scope.onSelectDictionary = function (choice) {
        $scope.selectedDictionary = choice;
        if (typeof $scope.selectedDictionary !== 'undefined' && typeof $scope.selectedDictionary.dictionary !== 'undefined') {
            $scope.dictionary = $scope.selectedDictionary.dictionary.sort().join(' ');
            $scope.generateMarkovChains();
        }
    };

    $scope.createDictionary = function () {
        var title = 'New Dictionary',
            i = 0,
            nextId,
            newDictionary;

        while (util.hasTitle($scope.dictionaries, title)) {
            i += 1;
            title = 'New Dictionary (' + i + ')';
        }

        newDictionary = {
            title: title,
            dictionary: [],
            isUnsaved: true
        };

        $scope.dictionaries.push(newDictionary);
        $scope.onSelectDictionary(newDictionary);
    };

    $scope.saveDictionary = function () {
        var dico = $scope.selectedDictionary;
        $q.when(pouchDBServices.saveDictionary(dico.id, dico.title, dico.dictionary))
            .then(function (response) {
                $scope.selectedDictionary.id = response.id; // Asign created ID in case of first save
                $scope.selectedDictionary.isUnsaved = false;
            })
            .catch(function (error) {
                $scope.error = 'Oops... Something went wrong while saving the dictionary.';
            });
    };

    $scope.renameDictionary = function (newTitle) {

        // If it's a new dictionnary (not saved yet) don't update data in the DB
        if (typeof $scope.selectedDictionary.id === 'undefined') {
            var i;
            for (i = 0; i < $scope.dictionaries.length; i += 1) {
                if ($scope.dictionaries[i].title === $scope.selectedDictionary.title) {
                    $scope.dictionaries[i].title = newTitle;
                }
            }

            $scope.selectedDictionary.title = newTitle;
        } else {
            $q.when(pouchDBServices.renameDictionary($scope.selectedDictionary.id, newTitle))
                .then(function (response) {
                    var i;
                    for (i = 0; i < $scope.dictionaries.length; i += 1) {
                        if ($scope.dictionaries[i].id === $scope.selectedDictionary.id) {
                            $scope.dictionaries[i].title = newTitle;
                        }
                    }

                    $scope.selectedDictionary.title = newTitle;
                })
                .catch(function (error) {
                    $scope.error = 'Oops... Something went wrong while renaming the dictionary.';
                });
        }
    };

    $scope.deleteDictionary = function () {
        if (typeof $scope.selectedDictionary.id === 'undefined') {
            var i;
            for (i = 0; i < $scope.dictionaries.length; i += 1) {
                if ($scope.dictionaries[i].id === $scope.selectedDictionary.id) {
                    $scope.dictionaries.splice(i, 1);
                }
            }

            // Create a new dictionary if the last dictionary has been deleted
            if ($scope.dictionaries.length === 0) {
                $scope.createDictionary();
            }

            $scope.onSelectDictionary($scope.dictionaries[0]);

        } else {
            $q.when(pouchDBServices.removeDictionary($scope.selectedDictionary.id))
                .then(function (result) {
                    var i;
                    for (i = 0; i < $scope.dictionaries.length; i += 1) {
                        if ($scope.dictionaries[i].id === $scope.selectedDictionary.id) {
                            $scope.dictionaries.splice(i, 1);
                        }
                    }

                    // Create a new dictionary if the last dictionary has been deleted
                    if ($scope.dictionaries.length === 0) {
                        $scope.createDictionary();
                    }

                    $scope.onSelectDictionary($scope.dictionaries[0]);
                })
                .catch(function (error) {
                    $scope.error = 'Oops... Something went wrong while deleting the dictionary.';
                });
        }
    };

    $scope.loadDictionaries = function (newDictionaries) {
        var i,
            j,
            dictionariesToInsert = [];

        for (i = 0; i < newDictionaries.length; i += 1) {
            j = 0;

            while (util.hasTitle($scope.dictionaries, newDictionaries[i].title)) {
                j += 1;
                newDictionaries[i].title = newDictionaries[i].title + ' (' + j + ')';
            }

            dictionariesToInsert.push({
                title: newDictionaries[i].title,
                values: newDictionaries[i].values
            });
        }

        $q.when(pouchDBServices.insertDictionaries(dictionariesToInsert))
            .then(function (result) {
                var i;
                $scope.dictionaries = [];

                if (typeof result !== 'undefined' && typeof result.rows !== 'undefined') {

                    result.rows.sort(util.creationOrder);

                    for (i = 0; i < result.rows.length; i += 1) {
                        $scope.dictionaries.push({
                            id: result.rows[i].doc._id,
                            title: result.rows[i].doc.title,
                            dictionary: result.rows[i].doc.values,
                            isUnsaved: false
                        });
                    }
                    $scope.onSelectDictionary($scope.dictionaries[$scope.dictionaries.length - 1]);
                }
            })
            .catch(function (error) {
                $scope.error = 'Oops... Something went wrong while loading the dictionaries.';
            });
    };

    $scope.resetDictionaries = function () {

        $q.when(pouchDBServices.reset())
            .then(function (result) {
                var i;
                $scope.dictionaries = [];

                if (typeof result !== 'undefined' && typeof result.rows !== 'undefined') {
                    result.rows.sort(util.creationOrder);

                    for (i = 0; i < result.rows.length; i += 1) {
                        $scope.dictionaries.push({
                            id: result.rows[i].doc._id,
                            title: result.rows[i].doc.title,
                            dictionary: result.rows[i].doc.values,
                            isUnsaved: false
                        });
                    }

                    $scope.onSelectDictionary($scope.dictionaries[0]);
                    $scope.error = '';
                }

            })
            .catch(function (error) {
                $scope.error = 'Oops... Something went wrong during the reset.';
            });
    };
    /* */

    /* Settings management */
    $scope.onClickSettings = function () {
        $window.document.activeElement.blur();
        $scope.hasSettingsDisplayed = ($scope.hasSettingsDisplayed) ? false : true;
    };

    $scope.sliderLength = {
        min: 3,
        max: 15,
        value: [4, 11],
        step: 1
    };

    $scope.sliderOrder = {
        min: 1,
        max: 5,
        value: 3,
        step: 1
    };

    previousLength = $scope.sliderLength.value;
    previousOrder = $scope.sliderOrder.value;

    $scope.onSlideLength = function (value) {
        if (value[0] !== previousLength[0] || value[1] !== previousLength[1]) {
            previousLength = value;
            $scope.generateMarkovChains();
        }
    };

    $scope.onSlideOrder = function (value) {
        if (value !== previousOrder) {
            previousOrder = value;
            $scope.generateMarkovChains();
        }
    };

    $scope.startWith = '';
    $scope.endWith = '';
    $scope.contains = '';
    $scope.doesntContains = '';
    /* */

    $scope.onChangeDictionary = function () {
        var i;
        for (i = 0; i < $scope.dictionaries.length; i += 1) {
            if ($scope.dictionaries[i].id === $scope.selectedDictionary.id) {
                $scope.dictionaries[i].isUnsaved = true;
            }
        }

        $scope.selectedDictionary.isUnsaved = true;

        $scope.selectedDictionary.dictionary = $scope.dictionary.toLowerCase().split(' ');
        $scope.generateMarkovChains();
    };

    $scope.generateMarkovChains = function () {
        var i,
            j,
            maxAttemps = 1000,
            result;

        if ($window.document.activeElement.tagName !== 'INPUT' && window.document.activeElement.tagName !== 'TEXTAREA') {
            $window.document.activeElement.blur();
        }

        markovChainGenerator.refresh();
        markovChainGenerator.setOrder($scope.sliderOrder.value);
        markovChainGenerator.addWordsToChain($scope.dictionary.toLowerCase().split(' '));

        $scope.names = [];

        for (i = 0, j = 0; j < $scope.totalNames; i += 1) {
            if (i > maxAttemps) {
                j = $scope.totalNames;
            }

            result = markovChainGenerator.generateWord(
                $scope.sliderLength.value[0],
                $scope.sliderLength.value[1],
                $scope.startWith.toLowerCase(),
                $scope.endWith.toLowerCase(),
                $scope.contains.toLowerCase(),
                $scope.doesntContains.toLowerCase()
            );
            if (typeof result !== 'undefined' && $scope.names.indexOf(result) === -1) {
                j += 1;
                $scope.names.push(result);
            }
        }
    };

    $scope.totalNames = 30;
    $scope.onSelectTotalItems = function (total) {
        $scope.totalNames = total;
        $scope.generateMarkovChains();
    };

    $scope.generatorReady = false;

    $q.when(pouchDBServices.getAllDictionaries())
        .then(function (result) {
            var i;
            $scope.dictionaries = [];

            if (typeof result !== 'undefined' && typeof result.rows !== 'undefined') {
                result.rows.sort(util.creationOrder);

                for (i = 0; i < result.rows.length; i += 1) {
                    $scope.dictionaries.push({
                        id: result.rows[i].doc._id,
                        title: result.rows[i].doc.title,
                        dictionary: result.rows[i].doc.values,
                        isUnsaved: false
                    });
                }

                $scope.onSelectDictionary($scope.dictionaries[0]);
                $scope.generatorReady = true;
            }

        })
        .catch(function (error) {
            $scope.error = 'Oops... Something went wrong during initialization. Please try to reset the data or come back later.';
            $scope.generatorReady = true;
        });
}]);

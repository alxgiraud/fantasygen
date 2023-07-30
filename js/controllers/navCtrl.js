/*global app*/
app.controller('navCtrl', ['$scope', '$window', function ($scope, $window) {
    'use strict';

    $scope.tabs = [
        {
            link: '#/markovChain',
            label: 'Markov Chain'
        },
        {
            link: '#/genericFantasy',
            label: 'Generic Fantasy'
        },
        {
            link: '#/fantasticSpecies',
            label: 'Fantastic Species'
        },
        {
            link: '#/groups',
            label: 'Groups'
        },
        {
            link: '#/taverns',
            label: 'Taverns'
        }
    ];

    $scope.selectedTab = $scope.tabs[0];
    
    $scope.onClickSelectTab = function (tab) {
        $scope.selectedTab = tab;
    };

    $scope.tabClass = function (tab) {
        return ($scope.selectedTab === tab) ? 'active' : '';
    };

    $scope.type = ($window.innerWidth < 768) ? 'nav-pills nav-stacked' : 'nav-tabs';
}]);

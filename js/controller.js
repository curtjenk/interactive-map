var interactiveMapApp = angular.module('interactiveMapApp', []);

interactiveMapApp.controller('interactiveMapCtrl', function($scope) {
    resetStates();
    calculateStateTotals();

    $scope.states = states;
    $scope.stateClicked = function(state) {
        var newColor = getNewColor(state);
        calculateStateTotals();

    };

    function getNewColor(state) {
        if (state.stateColor === "red") {
            state.stateColor = "blue";
            blueStates[state.id] = state;
            redStates[state.id] = "";
        } else if (state.stateColor === "blue") {
            state.stateColor = "open";
            openStates[state.id] = state;
            blueStates[state.id] = "";
        } else if (state.stateColor === "open") {
            state.stateColor = "red";
            redStates[state.id] = state;
            openStates[state.id] = "";
        }
    }

    function calculateStateTotals() {
        $scope.redStateVotes = 0;
        $scope.blueStateVotes = 0;
        $scope.openStateVotes = 0;
        for (i = 0; i < numStates; i++) {
            if (blueStates[i]) {
                $scope.blueStateVotes += blueStates[i].electoralVotes;
            } else if (redStates[i]) {
                $scope.redStateVotes += redStates[i].electoralVotes;
            } else if (openStates[i]) {
                $scope.openStateVotes += openStates[i].electoralVotes;
            }
        }
        var totalElectoralVotes = 538;
        $scope.blueWidth = ($scope.blueStateVotes / totalElectoralVotes) * 100 + '%';
        $scope.redWidth = ($scope.redStateVotes / totalElectoralVotes) * 100 + '%';
        $scope.openWidth = ($scope.openStateVotes / totalElectoralVotes) * 100 + '%';
        console.log($scope.blueStateVotes);
        console.log($scope.redStateVotes);
        console.log($scope.openStateVotes);
    }



});

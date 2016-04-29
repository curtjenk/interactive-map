var interactiveMapApp = angular.module('interactiveMapApp', []);

interactiveMapApp.controller('interactiveMapCtrl', function($scope) {
    $scope.showMe = [{ name: 'curtis', age: 35 }];
    $scope.blueWinCombos = {};
    $scope.redWinCombos = {};
    resetStates();
    calculateStateTotals();
    $scope.states = states;

    $scope.stateClicked = function(state) {
        var newColor = getNewColor(state);
        calculateStateTotals();

    };
    $scope.reset = function() {
        resetStates();
        calculateStateTotals();
        $scope.states = states;
    }
    $scope.smStateClicked = function(stateNdx) {
        var newColor = getNewColor(states[stateNdx]);
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
            // openStates[state.id] = "";
            delete openStates[state.id];
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
        // console.log($scope.blueStateVotes);
        // console.log($scope.redStateVotes);
        // console.log($scope.openStateVotes);

        $scope.blueWinCombos = winningCombos($scope.blueStateVotes);
        $scope.redWinCombos = winningCombos($scope.redStateVotes);
            //console.log($scope.redWinCombos);
    }

    function winningCombos(partyVotes) {
        var comboArr = [];
        var sum = partyVotes;
        var resultsArr = [];
        // var resultsMap = new Map();
        var cnt = 0;
        var open = openStates;
        var uniqueCombo = [];

        var tempArr = [];

        for (var ndx in openStates) {
            tempArr.push(openStates[ndx]);
        }

        var iterations = 0;
        var statesX = [];
        while (cnt < 50) {
            iterations++;
            if (iterations > 1000) {
                console.log("Spinning at " + cnt);
                break;
            }

            shuffle(tempArr);

            for (var i = 0; i < tempArr.length; i++) {
                // sum += tempArr[i].electoralVotes;
                // if (sum <= 270 ) {
                //   comboArr.push(tempArr[i].name);
                //   if (sum == 270) {
                //     break;
                //   }
                // } else {
                //   sum -= tempArr[i].electoralVotes;
                // }

                if ((sum + tempArr[i].electoralVotes) > 270) {
                    //
                } else {
                    comboArr.push(tempArr[i].name);
                    sum += tempArr[i].electoralVotes;
                    // if (sum === 270) {break;}
                }
            }
            if (sum >= 270) {
                statesX = comboArr.sort().join(',');
                if (!uniqueCombo[statesX]) {
                    uniqueCombo[statesX] = sum;
                    cnt++;
                }
            }
            collection = [];
            sum = partyVotes;
            comboArr = [];

        }

        // resultsMap = undefined;
        for (var key in uniqueCombo) {
            resultsArr.push(key);
        }

        return resultsArr.sort();
        // return resultsArr;
    }

    //shuffle using a version of knuth-shuffle algorithm
    // in-place shuffle.
    // https://github.com/coolaj86/knuth-shuffle
    function shuffle(cardDeck) {
        var currentIndex = cardDeck.length,
            temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            //Now swap
            temporaryValue = cardDeck[currentIndex];
            cardDeck[currentIndex] = cardDeck[randomIndex];
            cardDeck[randomIndex] = temporaryValue;
        }
    }

});

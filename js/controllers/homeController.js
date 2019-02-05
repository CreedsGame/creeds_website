creeds.controller('homeController', ['$localStorage', '$rootScope', '$scope', '$http', 'apiConfig', '$location', function ($localStorage, $rootScope, $scope, $http, apiConfig, $location) {

    // Set current page title
    $rootScope.pageTitle = "Creeds";

    // Validations
    $scope.name = {ok: true, message: ""};
    $scope.password = {ok: true, message: ""};

    // Loading flag
    $scope.loading = false;
    
    // Loading progress
    $scope.progress = [];

    // Get random level 1 opponent
    getRandomCharacter();

    // Form data validations
    $scope.acceptChallenge = function(fighter, opponent) {
        if (fighter && opponent) {
            if (fighter.name && fighter.password && fighter.passwordAgain && $scope.name.ok) {
                if (fighter.name.trim() != "") {
                    if (fighter.password == fighter.passwordAgain) {
                        if (fighter.password.length <= 50) {
                            $scope.loading = true;
                            $scope.progress.push("Creating new character...");
                            createNewCharacter(fighter, opponent);
                        }
                        else {
                            $scope.password.ok = false;
                            $scope.password.message = "50 characters max!";
                        }
                    }
                    else {
                        $scope.password.ok = false;
                        $scope.password.message = "Passwords should match!";
                    }
                }
            }
        }
    };

    // Form data validations
    $scope.validate = function(fighter) {
        // Name validation
        if (fighter.name) {
            // Alphanumeric only
            if (/^[a-zA-Z0-9]+$/.test(fighter.name)) {
                // Name's length
                if (fighter.name.length <= 30) {
                    resetNameValidation();
                }
                else {
                    $scope.name.ok = false;
                    $scope.name.message = "30 characters max!";
                }
            }
            else {
                $scope.name.ok = false;
                $scope.name.message = "Alphanumeric only!";
            }
        }
        else {
            resetNameValidation();
        }
        // Reset password validation
        if (fighter.password && fighter.passwordAgain) {
            if (fighter.password == fighter.passwordAgain) {
                resetPasswordValidation();
            }
        }
    };

    // Reset loading progress
    function resetLoading() {
        $scope.loading = false;
        $scope.progress = [];
    }

    // Reset name validation
    function resetNameValidation() {
        $scope.name.ok = true;
        $scope.name.message = "";
    }

    // Reset password validation
    function resetPasswordValidation() {
        $scope.password.ok = true;
        $scope.password.message = "";
    }

    // Create a new character
    function createNewCharacter(character, opponent) {
        $http({
            method: 'PUT',
            url: apiConfig["baseUrl"] + apiConfig["character"],
            data: `name=${character.name.trim()}&password=${character.password}`
        }).then(function successCallback(response) {
            $scope.progress.push("Starting battle...");
            startBattle(character, opponent);
        }, function errorCallback(response) {
            $scope.name.ok = false;
            $scope.name.message = response.data.status_message;
            resetLoading();
        });
    }

    // Start a new battle
    function startBattle(fighter, opponent) {
        $http({
            method: 'PUT',
            url: apiConfig["baseUrl"] + apiConfig["battle"],
            data: `fighter=${fighter.name.trim()}&password=${fighter.password}&opponent=${opponent.name}`
        }).then(function successCallback(response) {
            $scope.progress.push("ID: " + response.data.data["id"]);
            $scope.progress.push("Redirecting...");
            $location.path("/" + apiConfig["battle"] + "/" + response.data.data["id"]);
        }, function errorCallback(response) {
            $scope.name.ok = false;
            $scope.name.message = response.data.status_message;
            resetLoading();
        });
    }
    
    // Get random level 1 opponent
    function getRandomCharacter() {
        $http({
            method: 'GET',
            url: apiConfig["baseUrl"] + apiConfig["character"] + "/?level=1"
        }).then(function successCallback(response) {
            // Select a random character
            $scope.opponent = response.data.data[randomIntFromInterval(0, response.data.data.length - 1)];
        }, function errorCallback(response) {
            // --
        });
    }

}]);
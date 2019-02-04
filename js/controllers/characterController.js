creeds.controller('characterController', ['$localStorage', '$rootScope', '$scope', '$http', 'apiConfig', '$location', '$routeParams', function ($localStorage, $rootScope, $scope, $http, apiConfig, $location, $routeParams) {

    // Set current page title
    $rootScope.pageTitle = "Creeds character";

    // Get character's name
    $scope.characterName = $routeParams.characterName;

    // Get current character data
    getCharacterData($scope.characterName);

    // Get current character data
    function getCharacterData(characterName) {
        $http({
            method: 'GET',
            url: apiConfig["baseUrl"] + apiConfig["character"] + "/?name=" + characterName
        }).then(function successCallback(response) {
            $scope.character = response.data.data[0];
            // Undefined data
            if (!$scope.character) {
                $location.path("/");
            }
        }, function errorCallback(response) {
            $location.path("/");
        });
    }

}]);